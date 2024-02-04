# import js
# import mip
from lib.http_router import *

class Request:
    def __init__(self, url, method, headers, body, cache, redirect, referrer, referrerPolicy, integrity, keepalive):
        self.url = url
        self.method = method
        self.headers = headers
        self.body = body
        self.cache = cache
        self.redirect = redirect
        self.referrer = referrer
        self.referrerPolicy = referrerPolicy
        self.integrity = integrity
        self.keepalive = keepalive
        
class Response:
    def __init__(self, body=None, status=200, statusText="", headers={}):
        self.status = status
        self.statusText = statusText
        self.headers = headers
        self.body = body


    # def json(self):
    #     import json
    #     if self.body:
    #         return json.loads(self.body)
    #     return None
    
    # def text(self):
    #     return self.body
