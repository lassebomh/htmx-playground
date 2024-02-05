from lib.http import Response
from router import GET

@GET('/')
def index(request):
    return Response("<html><body>Hello world</body></html>", headers={'Content-Type': 'text/html'})
