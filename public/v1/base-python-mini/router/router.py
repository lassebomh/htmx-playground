from pyodide.ffi import to_js

from os.path import join, abspath, normpath, exists
from mimetypes import guess_type as guess_mimetype

from http_router import Router as HttpRouter

from lib.http import Response, Request

class Router(HttpRouter):
    def __init__(self):
        super().__init__()
        self._add_method_shortcuts(['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS', 'TRACE', 'PATCH'])

    def _add_method_shortcuts(self, methods):
        for method in methods:
            setattr(self, method.lower(), self._create_decorator(method))
    
    def _create_decorator(self, method):
        def decorator(path):
            def wrapper(fn):
                self.route(path, methods=[method])(fn)
                return fn
            return wrapper
        return decorator

    def static(self, base_dir):
        base_dir = abspath(base_dir)

        def static_handler(request, path):

            full_path = normpath(join(base_dir, path))

            if exists(full_path):

                file = open(full_path, 'r')
                content = file.read()
                file.close()

                mimetype, _ = guess_mimetype(full_path)

                return Response(content,
                    status=200,
                    headers={
                        'Content-Type': mimetype
                    }
                )
            else:
                return Response(status=404)

        self.get('/{path:path}')(static_handler)        

    async def request_handler(self, _request):
        request = Request(
            _request.url,
            _request.method,
            {k: v for k,v in _request.headers},
            _request.body if _request.hasBody else None,
            _request.cache,
            _request.redirect,
            _request.referrer,
            _request.referrerPolicy,
            _request.integrity,
            _request.keepalive,
        )

        match = self(request.path, method=request.method)
        
        res = match.target(
            request,
            **(match.path_params or {})
        )

        return to_js([res.body, {
            "status": res.status,
            "statusText": res.statusText,
            "headers": res.headers,
        }])

router = Router()

GET = router.GET
HEAD = router.HEAD
POST = router.POST
PUT = router.PUT
DELETE = router.DELETE
CONNECT = router.CONNECT
OPTIONS = router.OPTIONS
TRACE = router.TRACE
PATCH = router.PATCH

route = router.route
static = router.static