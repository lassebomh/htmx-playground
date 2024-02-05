from router import GET, POST
from lib.templates import render

from random import randint

@GET('/')
def index(request):
    context = {
        'title': "Snake eyes!",
        "rolls": [randint(1, 6) for _ in range(2)]
    }
    return render(request, 'index.html', context)

@POST('/roll')
def roll(request):
    context = {
        "rolls": [randint(1, 6) for _ in range(2)]
    }
    return render(request, 'dice.html', context)

# on.static('./public', '/')