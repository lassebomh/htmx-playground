
import sys

specificmodules = [
    "django.core.handlers.base",
    "django.core.handlers.wsgi",
    "django.core.handlers",
    "django.core.wsgi",
    "django.core",
    "django.urls.resolvers",
    "django.urls",
]

# for k in list(sys.modules.keys()):
#     if k.startswith('django.core'):
#         print(k)
#         del sys.modules[k]

for name in specificmodules:
    if name in sys.modules:
        del sys.modules[name]


from pyodide.ffi import to_js
import js

from io import BytesIO
from urllib.parse import urlparse

from django.core.wsgi import get_wsgi_application
from django.contrib.staticfiles.handlers import StaticFilesHandler
# from django.core.management import call_command

application = StaticFilesHandler(get_wsgi_application())
application.load_middleware()

# call_command('migrate')

def handle(_request):
    url = urlparse(_request.url)

    environ = {
        'SERVER_NAME': 'localhost',
        'SERVER_PORT': '80',
        'REQUEST_METHOD': _request.method,
        'PATH_INFO': url.path,
        'QUERY_STRING': url.query,
        **{
            'HTTP_' + key.replace('-', '_').upper(): value
                for key, value in _request.headers
        },
        'wsgi.version': (1, 0),
        'wsgi.input': BytesIO(),
        'wsgi.url_scheme': 'http',
    }

    if hasattr(_request, 'body'):
        body = BytesIO(_request.body.to_py().tobytes())
        environ['wsgi.input'] = body

    response = application(environ, lambda a,b:...)

    if hasattr(response, 'content'):
        body = response.content
    else:
        body = b"".join(response).decode()

    return to_js([body, {
        "status": response.status_code,
        "statusText": response.reason_phrase,
        "headers": {k: v for k, v in response.items()},
    }])

def start():
    js.requestHandler = handle
    js.startclient()