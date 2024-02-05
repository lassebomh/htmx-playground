from router import GET, POST, static
from lib.templates import render

from random import randint

static('./public')

@GET('/')
def index(request):
    context = {
        'title': "Snake eyes!",
        "rolls": [1, 1, 1, 1, 1, 1]
    }
    return render(request, 'index.html', context)

@POST('/roll')
def roll(request):
    context = {
        "pips": randint(1, 6)
    }
    return render(request, 'die.html', context)
