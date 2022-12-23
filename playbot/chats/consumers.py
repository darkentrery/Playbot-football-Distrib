from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer

from playbot.chats.models import Message, Chat
from playbot.chats.serializers import ChatSerializer, MessageSerializer
from playbot.events.models import EventPlayer


class ChatConsumer(JsonWebsocketConsumer):
    """
    This consumer is used to show user's online status,
    and send notifications.
    """

    def __init__(self, *args, **kwargs):
        super().__init__(args, kwargs)
        # self.room_name = None
        self.user = None
        self.chat = None

    def connect(self):
        print("Connected!")
        # self.room_name = "home"
        self.user = self.scope["user"]
        event_id = self.scope["url_route"]["kwargs"]["event_id"]
        self.chat = Chat.objects.get(event_id=event_id)
        if not self.user.is_authenticated or (not EventPlayer.objects.filter(event_id=event_id, player=self.user).exists()
                                              and self.chat.event.organizer != self.user):
            return
        self.accept()

        async_to_sync(self.channel_layer.group_add)(
            str(self.chat.id),
            self.channel_name,
        )
        self.send_json(
            {
                "type": "history_messages",
                "message": ChatSerializer(instance=self.chat).data,
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
                str(self.chat.id),
                {
                    "type": "chat_message_echo",
                    "message": MessageSerializer(instance=message).data,
                },
            )
        print(content)
        return super().receive_json(content, **kwargs)

    def chat_message_echo(self, event):
        print(event)
        self.send_json(event)