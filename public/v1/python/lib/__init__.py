import js
import asyncio

from tiny_router import SimpleRouter

print(SimpleRouter)

Response = js.Response.new
Request = js.Request.new


router = SimpleRouter()


@router.get("/users/{user_id}")
def get_user(params):
    if params.get("user_id") == 1:
        return {"id": 1, "name": "Alice"}

route = router.resolve("GET", "/users/{user_id}")
user = route({"user_id": 1})

print(route, user)