from django.urls import path

from playbot.chats.consumers import ChatConsumer
from playbot.events.consumers import EventGameConsumer


websocket_urlpatterns = [
    path("ws/<int:event_id>/", ChatConsumer.as_asgi()),
    path("ws/event-game/<int:id>/", EventGameConsumer.as_asgi()),
]
