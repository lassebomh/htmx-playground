import js
from js import Object
from pyodide.ffi import to_js, create_once_callable

import asyncio
from os.path import join, abspath, normpath
from mimetypes import guess_type as guess_mimetype
from urllib.parse import urlparse

from http_router import Router as HttpRouter
from jinja2 import Environment, FileSystemLoader, select_autoescape



Request = js.Request.new

def Response(body, options={}):
    return to_js([body, options])

env = Environment(
    loader=FileSystemLoader("./"),
    autoescape=select_autoescape()
)

def render(request, template_path, context={}):
    template = env.get_template(template_path)
    output = template.render(request=request, **context)
    mimetype, encoding = guess_mimetype(template_path)

    return Response(output, {
        'status': 200,
        'headers': {
            'Content-Type': mimetype
        }
    })

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
        
        @self.get('/{path:path}')
        async def static_handler(request, path):
            full_path = normpath(join(base_dir, path))
            if not full_path.startswith(base_dir):
                raise ValueError("Invalid path")

            file = open(full_path, 'r')
            content = file.read()
            
            file.close()

            mimetype, encoding = guess_mimetype(full_path)

            return Response(content, {
                'status': 200,
                'headers': {
                    'Content-Type': mimetype
                }
            })

        # (static_handler)

    def request_handler(self, request):
        url = urlparse(request.url)
        match = self(url.path)
        
        return match.target(
            request,
            **(match.path_params or {})
        )

    def listen(self):
        js.requestHandler = self.request_handler
        js.startclient()

on = Server()
