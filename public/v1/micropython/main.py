
from lib import Request
from lib.urllib import unquote
from js import window
import json

import os

from lib.http_router import Router


# Initialize the router
router = Router(trim_last_slash=True)

@router.route('/simple')
def simple():
    return 'result from the fn'

match = router('/simple', method='GET')

print(match)

def handler(request):

    r = Request(
        request.url,
        request.method,
        {k: v for k,v in request.headers},
        request.body if request.hasBody else None,
        request.cache,
        request.redirect,
        request.referrer,
        request.referrerPolicy,
        request.integrity,
        request.keepalive,
    )

    response = [
        'hello',
        {
            'status': 200,
            'statusText': "",
            'headers': {
                'content-type': 'html'
            }
        }
    ]

    return json.dumps(response)

window.requestHandler = handler
window.startclient()