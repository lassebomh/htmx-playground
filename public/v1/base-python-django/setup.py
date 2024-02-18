
import sys
import django

django.setup()

from django.core.management import call_command

def init():
    from django.contrib.auth.hashers import PBKDF2PasswordHasher
    PBKDF2PasswordHasher.iterations = 1
    
    call_command('makemigrations', interactive=False)
    call_command('migrate', interactive=False)
    call_command('createsuperuser', interactive=False)


def main():
    delmodules = [
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

    for name in delmodules:
        if name in sys.modules:
            del sys.modules[name]

    call_command('check')

    from django.core.wsgi import get_wsgi_application
    from django.contrib.staticfiles.handlers import StaticFilesHandler

    application = StaticFilesHandler(get_wsgi_application())

    import js
    from io import BytesIO
    from pyodide.ffi import to_js
    from urllib.parse import urlparse

    def handle(request):
        url = urlparse(request.url)

        environ = {
            'SERVER_PORT': js.location.port or '443',
            'SERVER_PROTOCOL': url.scheme,
            'REQUEST_METHOD': request.method,
            'PATH_INFO': url.path,
            'QUERY_STRING': url.query,
            **{
                'HTTP_' + key.replace('-', '_').upper(): value
                    for key, value in request.headers
            },
            'wsgi.version': (1, 0),
            'wsgi.input': BytesIO(),
            'wsgi.url_scheme': url.scheme,
        }

        if hasattr(request, 'body'):
            body = BytesIO(request.body.to_py().tobytes())
            environ['wsgi.input'] = body
            environ['CONTENT_TYPE'] = request.contentType
            environ['CONTENT_LENGTH'] = request.contentLength

        response = application(environ, lambda a,b:...)

        response_headers = [
            *response.items(),
            *(("Set-Cookie", c.output(header="")) for c in response.cookies.values()),
        ]

        if hasattr(response, 'content'):
            body = response.content
        else:
            body = b"".join(response).decode()

        return to_js([body, {
            "status": response.status_code,
            "statusText": response.reason_phrase,
            "headers": response_headers,
        }])

    js.requestHandler = handle
    js.startclient()