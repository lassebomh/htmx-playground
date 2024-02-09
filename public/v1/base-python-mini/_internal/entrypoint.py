import js
import main
from router import router

def start():
    js.requestHandler = router.request_handler
    js.startclient()