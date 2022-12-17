from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer

from playbot.chats.models import Message, Chat


class ChatConsumer(JsonWebsocketConsumer):
    """
    This consumer is used to show user's online status,
    and send notifications.
    """

    def __init__(self, *args, **kwargs):
        super().__init__(args, kwargs)
        self.room_name = None
        self.user = None
        self.chat = None

    def connect(self):
        print("Connected!")
        self.room_name = "home"
        self.user = self.scope["user"]
        if not self.user.is_authenticated:
            return
        self.accept()
        event_id = self.scope["url_route"]["kwargs"]["event_id"]
        self.chat = Chat.objects.get(event_id=event_id)
        async_to_sync(self.channel_layer.group_add)(
            self.room_name,
            self.channel_name,
        )
        self.send_json(
            {
                "type": "welcome_message",
                "message": "Hey there! You've successfully connected!",
            }
        )

    def disconnect(self, code):
        print("Disconnected!")
        return super().disconnect(code)

    def receive_json(self, content, **kwargs):
        message_type = content["type"]
        if message_type == "chat_message":
            message = Message.objects.create(from_user=self.user, content=content["message"], chat=self.chat)
            async_to_sync(self.channel_layer.group_send)(
                self.room_name,
                {
                    "type": "chat_message_echo",
                    "name": content["name"],
                    "message": content["message"],
                },
            )
        print(content)
        return super().receive_json(content, **kwargs)

    def chat_message_echo(self, event):
        print(event)
        self.send_json(event)