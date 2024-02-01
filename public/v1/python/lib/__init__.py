from http_router import Router
import js
import asyncio

Response = js.Response.new
Request = js.Request.new

on = Router()

for method in ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS', 'TRACE', 'PATCH']:
    def func(f, *args, **kwargs):
        return on.route(f, *args, **kwargs, method=method)

    setattr(on, method.lower(), func)

@on.get('/simple')
def simple():
    return 'result from the fn'

match = on('/simple', method='GET')
print(match, 'HTTP path is ok')
print(match.target == simple)

