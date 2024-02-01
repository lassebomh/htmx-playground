import asyncio
import js
from lib import Request, Response, render, on

@on.get('/')
async def index(request):
    context = {
        'title': "hello world!"
    }
    # await on.request(request)

    return render(request, 'index.html', context)

on.static('./public', '/')

on.listen()