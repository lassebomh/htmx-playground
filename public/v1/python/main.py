import asyncio
import js
from lib import Request, Response

async def handler(request):
    response = Response("hello world", {
        "status": 200,
    })
    return response

js.requestHandler = handler

js.startclient()
