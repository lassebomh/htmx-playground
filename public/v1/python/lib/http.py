from urllib.parse import urlparse

class Request:
    def __init__(self, url, method, headers, body, cache, redirect, referrer, referrerPolicy, integrity, keepalive):
        self.url = urlparse(url)
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
