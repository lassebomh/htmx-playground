
from collections import defaultdict
from functools import partial
import re
from lib.urllib import unquote

# exceptions.py

class RouterError(Exception):
    pass

class NotFoundError(RouterError):
    pass

class InvalidMethodError(RouterError):
    pass

# utils.py

VAR_RE = re.compile(r"^([a-zA-Z][_a-zA-Z0-9]*)(?::(.+))?$")

VAR_TYPES = {
    "float": (r"\d+(\.\d+)?", float),
    "int": (r"\d+", int),
    "path": (r".*", str),
    "str": (r"[^/]+", str),
}

def identity(v: TVObj) -> TVObj:
    """Identity function."""
    return v

def parse_path(path: TPath) -> Tuple[str, Optional[Pattern], Dict[str, Callable]]:
    """Prepare the given path to regexp it."""
    print(type(path))
    if type(path).__name__ == 're':
        return path.pattern, path, {}

    src, regex, path = path.strip(" "), "^", ""
    params: Dict[str, Callable] = {}
    idx, cur, group = 0, 0, None
    while cur < len(src):
        sym = src[cur]
        cur += 1

        if sym == "{":
            if group:
                cur = src.find("}", cur) + 1
                continue

            group = cur
            continue

        if sym == "}" and group:
            part = src[group : cur - 1]
            length = len(part)
            match = VAR_RE.match(part.strip())
            if match:
                var_name = match.group(1)
                var_type = match.group(2) if match.group(2) is not None else "str"
                var_type_re, params[var_name] = VAR_TYPES.get(
                    var_type, (var_type, identity),
                )
                regex += (
                    re.escape(src[idx : group - 1])
                    + f"({ var_type_re })"
                )
                
                path += src[idx : group - 1] + f"{{{var_name}}}"
                cur = idx = group + length + 1

            group = None

    if not path:
        return src, None, params

    regex += re.escape(src[idx:]) + "$"
    path += src[idx:]
    return path, re.compile(regex), params

# router.py

class Router:
    """Route HTTP queries."""

    NotFoundError: ClassVar[Type[Exception]] = NotFoundError
    RouterError: ClassVar[Type[Exception]] = RouterError
    InvalidMethodError: ClassVar[Type[Exception]] = InvalidMethodError

    def __init__(
        self,
        *,
        trim_last_slash: bool = False,
        validator: Optional[Callable[[Any], bool]] = None,
        converter: Optional[Callable] = None,
    ):
        """Initialize the router.

        :param trim_last_slash: Ignore a last slash
        :param validator: Validate objects to route
        :param converter: Convert objects to route

        """
        self.trim_last_slash = trim_last_slash
        self.validator = validator or (lambda _: True)
        self.converter = converter or (lambda v: v)
        self.plain: DefaultDict[str, List[Route]] = defaultdict(list)
        self.dynamic: List[Route] = []

    def __call__(self, path: str, method: str = "GET") -> RouteMatch:
        """Found a target for the given path and method."""
        if self.trim_last_slash:
            path = path.rstrip("/")

        match = self.match(path, method)
        if not match.path:
            raise self.NotFoundError(path, method)

        if not match.method:
            raise self.InvalidMethodError(path, method)

        return match

    def __getattr__(self, method: str) -> Callable:
        """Shortcut to the router methods."""
        return partial(self.route, methods=method)

    def __route__(self, root: Router, prefix: str, *_, **__) -> Router:
        """Bind self as a nested router."""
        route = Mount(prefix, set(), router=self)
        root.dynamic.insert(0, route)
        return self

    # @lru_cache(maxsize=1024)  # noqa: B019
    def match(self, path: str, method: str) -> RouteMatch:
        """Search a matched target for the given path and method."""
        neighbour = None
        for route in self.plain[(path, self.dynamic)]:
            match = route.match(path, method)
            if match.path:
                if match.method:
                    return match
                neighbour = match

        return RouteMatch(path=False, method=False) if neighbour is None else neighbour

    def bind(
        self, target: Any, *paths: TPath, methods: Optional[TMethodsArg] = None, **opts,
    ) -> List[Route]:
        """Bind a target to self."""
        if opts:
            target = partial(target, **opts)

        if isinstance(methods, str):
            methods = [methods]

        if methods is not None:
            methods = {m.upper() for m in methods or []}

        routes = []

        for src in paths:
            path = src
            if self.trim_last_slash and isinstance(path, str):
                path = path.rstrip("/")

            path, pattern, params = parse_path(path)

            if pattern:
                route: Route = DynamicRoute(
                    path, methods=methods, target=target, pattern=pattern, params=params,
                )
                self.dynamic.append(route)

            else:
                route = Route(path, methods, target)
                self.plain[path].append(route)

            routes.append(route)

        return routes

    def route(
        self,
        *paths: TPath,
        methods: Optional[TMethodsArg] = None,
        **opts,
    ) -> Callable[[TVObj], TVObj]:
        """Register a route."""

        def wrapper(target: TVObj) -> TVObj:
            if hasattr(target, "__route__"):
                target.__route__(self, *paths, methods=methods, **opts)
                return target

            if not self.validator(target):
                raise self.RouterError("Invalid target: %r" % target)

            target = self.converter(target)
            self.bind(target, *paths, methods=methods, **opts)
            return target

        return wrapper

    def routes(self) -> List[Route]:
        """Get a list of self routes."""
        return sorted(
            self.dynamic + [r for routes in self.plain.values() for r in routes],
        )

# routes.py

class RouteMatch:
    """Keeping route matching data."""

    __slots__ = "path", "method", "target", "params"

    def __init__(
        self,
        path: bool,
        method: bool,
        target=None,
        params: Optional[Mapping[str, Any]] = None,
    ):
        self.path = path
        self.method = method
        self.target = target
        self.params = params

    def __bool__(self):
        return self.path and self.method

    def __repr__(self):
        return f"<RouteMatch path:{self.path} method:{self.method} - {self.target}>"


class Route:
    """Base plain route class."""

    __slots__ = "path", "methods", "target"

    def __init__(
        self, path: str, methods: Optional[TMethods] = None, target: Any = None,
    ):
        self.path = path
        self.methods = methods
        self.target = target

    def __lt__(self, route: "Route") -> bool:
        assert isinstance(route, Route), "Only routes are supported"
        return self.path < route.path

    def match(self, path: str, method: str) -> RouteMatch:
        """Is the route match the path."""
        methods = self.methods
        return RouteMatch(
            path == self.path, methods is None or (method in methods), self.target,
        )


class DynamicRoute(Route):
    """Base dynamic route class."""

    __slots__ = "path", "methods", "target", "pattern", "params"

    def __init__(
        self,
        path: str,
        methods: Optional[TMethods] = None,
        target: Any = None,
        pattern: Optional[Pattern] = None,
        params: Optional[Dict] = None,
    ):
        if pattern is None:
            path, pattern, params = parse_path(path)
            assert pattern, "Invalid path"
        self.pattern = pattern
        self.params = params or {}
        super(DynamicRoute, self).__init__(path, methods, target)

    def match(self, path: str, method: str) -> RouteMatch:
        match = self.pattern.match(path)
        if not match:
            return RouteMatch(False, False)

        return RouteMatch(
            True,
            not self.methods or method in self.methods,
            self.target,
            {
                key: self.params.get(key, identity)(unquote(value))
                for key, value in match.groupdict().items()
            },
        )


class PrefixedRoute(Route):
    """Match by a prefix."""

    def __init__(
        self, path: str, methods: Optional[TMethods] = None, target: Any = None,
    ):
        path, pattern, _ = parse_path(path)
        if pattern:
            assert not pattern, "Prefix doesn't support patterns."

        super(PrefixedRoute, self).__init__(path.rstrip("/"), methods, target)

    def match(self, path: str, method: str) -> RouteMatch:
        """Is the route match the path."""
        methods = self.methods
        return RouteMatch(
            path.startswith(self.path), not methods or (method in methods), self.target,
        )


class Mount(PrefixedRoute):
    """Support for nested routers."""

    def __init__(
        self,
        path: str,
        methods: Optional[TMethods] = None,
        router: Optional[Router] = None,
    ):
        """Validate self prefix."""
        router = router or Router()
        super(Mount, self).__init__(path, methods, router.match)

    def match(self, path: str, method: str) -> RouteMatch:
        """Is the route match the path."""
        match: RouteMatch = super(Mount, self).match(path, method)
        if match:
            target = cast(Callable, self.target)
            return target(path[len(self.path) :], method)

        return match
