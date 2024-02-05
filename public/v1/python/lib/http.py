from urllib.parse import urlparse, parse_qs

class Request:
    def __init__(self, url, method, headers, body, cache, redirect, referrer, referrerPolicy, integrity, keepalive):
        self.url = url

        parsed_url = urlparse(url)

        self.query = parse_qs(parsed_url.query)
        self.path = parsed_url.path
        self.host = parsed_url.netloc
        self.scheme = parsed_url.scheme

        self.method = method
        self.headers = headers
        self.body = body
        self.cache = cache
        self.redirect = redirect
        self.referrer = referrer
        self.referrerPolicy = referrerPolicy
        self.integrity = integrity
        self.keepalive = keepalive
        
    def json():
        import json
        return json.loads(self.body)

class Response:
    def __init__(self, body=None, status=200, statusText="", headers={}):
        self.status = status
        self.statusText = statusText
        self.headers = headers
        self.body = body
