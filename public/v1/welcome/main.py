from lib import server as on, Request, Response, render

from random import randint

@on.get('/')
def index(request):
    context = {
        'title': "Snake eyes!",
        "rolls": [randint(1, 6) for _ in range(2)]
    }
    return render(request, 'index.html', context)

@on.post('/roll')
def roll(request):
    context = {
        "rolls": [randint(1, 6) for _ in range(2)]
    }
    return render(request, 'dice.html', context)

# on.static('./public', '/')

on.listen()