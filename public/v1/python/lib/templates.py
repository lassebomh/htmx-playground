
from jinja2 import Environment, FileSystemLoader, select_autoescape
from mimetypes import guess_type as guess_mimetype

from lib.http import Response

env = Environment(
    loader=FileSystemLoader(["./templates", "./"]),
    autoescape=select_autoescape()
)

def render(request, template_path, context={}, status=200, statusText="", headers={}):
    template = env.get_template(template_path)
    output = template.render(request=request, **context)

    if 'Content-Type' not in headers and 'content-type' not in headers:
        mimetype, encoding = guess_mimetype(template_path)
        headers['Content-Type'] = mimetype

    return Response(output,
        status=status,
        statusText=statusText,
        headers=headers
    )
