from asgiref.sync import sync_to_async
from channels.generic.websocket import AsyncJsonWebsocketConsumer

from playbot.chats.models import Message, Chat
from playbot.chats.serializers import ChatSerializer, MessageSerializer
from playbot.events.models import EventPlayer


class ChatConsumer(AsyncJsonWebsocketConsumer):
    """
    This consumer is used to show user's online status,
    and send notifications.
    """

    async def connect(self):
        print("Connected!")
        self.user = self.scope["user"]
        event_id = self.scope["url_route"]["kwargs"]["event_id"]
        self.chat = await sync_to_async(lambda: Chat.objects.get(event_id=event_id))()
        is_player = await sync_to_async(lambda: EventPlayer.objects.filter(event_id=event_id, player=self.user).exists())()
        is_organizer = await sync_to_async(lambda: self.chat.event.organizers.filter(id=self.user.id).exists())()
        if not self.user.is_authenticated or (not is_player and not is_organizer):
            return

        await self.accept()
        await self.channel_layer.group_add(str(self.chat.id), self.channel_name)
        message = await sync_to_async(lambda: ChatSerializer(instance=self.chat).data)()
        await self.send_json({"type": "history_messages", "message": message})

    async def disconnect(self, code):
        print("Disconnected!")
        return await super().disconnect(code)

    async def receive_json(self, content, **kwargs):
        message_type = content["type"]
        if message_type == "chat_message":
            message = await sync_to_async(lambda: Message.objects.create(from_user=self.user, content=content["message"], chat=self.chat))()
            message = await sync_to_async(lambda: MessageSerializer(instance=message).data)()
            await self.channel_layer.group_send(
                str(self.chat.id),
                {
                    "type": "chat_message_echo",
                    "message": message,
                },
            )
        print(content)
        return await super().receive_json(content, **kwargs)

    async def chat_message_echo(self, event):
        print(event)
        await self.send_json(event)