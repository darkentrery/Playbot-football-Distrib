from django.urls import path

from playbot.chats.consumers import ChatConsumer


websocket_urlpatterns = [
    path("ws/<int:event_id>/", ChatConsumer.as_asgi()),
]
