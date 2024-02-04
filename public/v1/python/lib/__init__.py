import js
from pyodide.ffi import to_js

from os.path import join, abspath, normpath
from mimetypes import guess_type as guess_mimetype

from http_router import Router as HttpRouter
from jinja2 import Environment, FileSystemLoader, select_autoescape

from .types import Response, Request

env = Environment(
    loader=FileSystemLoader("./"),
    autoescape=select_autoescape()
)

def render(request, template_path, context={}, status=200, statusText="", headers={}):
    template = env.get_template(template_path)
    output = template.render(request=request, **context)

    if 'headers' not in headers:
        mimetype, encoding = guess_mimetype(template_path)
        headers['Content-Type'] = mimetype

    return Response(output,
        status=status,
        statusText=statusText,
        headers=headers
    )

class Server(HttpRouter):
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

    def static(self, base_dir, path_prefix):
        base_dir = abspath(base_dir)
        
        async def static_handler(request, path):
            full_path = normpath(join(base_dir, path))
            if not full_path.startswith(base_dir):
                raise ValueError("Invalid path")

            file = open(full_path, 'r')
            content = file.read()
            
            file.close()

            mimetype, encoding = guess_mimetype(full_path)

            return Response(content,
                status=200,
                headers={
                    'Content-Type': mimetype
                }
            )

        self.get('/{path:path}')(static_handler)
        # (static_handler)

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

        match = self(request.url.path, method=request.method)
        
        res = match.target(
            request,
            **(match.path_params or {})
        )

        # print(res.headers)

        return to_js([res.body, {
            "status": res.status,
            "statusText": res.statusText,
            "headers": res.headers,
        }])

    def listen(self):
        js.requestHandler = self.request_handler
        js.startclient()

server = Server()
