from asgiref.sync import sync_to_async
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from django.utils import timezone

from playbot.chats.models import Message, Chat
from playbot.chats.serializers import ChatSerializer, MessageSerializer
from playbot.events.models import EventPlayer, EventGame, GamePeriod
from playbot.events.serializers import EventGameSerializer


class EventGameConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        print("Connected!")
        self.user = self.scope["user"]
        id = self.scope["url_route"]["kwargs"]["id"]
        self.game = await sync_to_async(lambda: EventGame.objects.get(id=id))()
        # self.chat = await sync_to_async(lambda: Chat.objects.get(event_id=id))()
        is_player = await sync_to_async(lambda: self.game.event.event_player.filter(player=self.user).exists())()
        is_organizer = await sync_to_async(lambda: self.game.event.organizers.filter(id=self.user.id).exists())()
        if not self.user.is_authenticated or (not is_player and not is_organizer):
            return

        await self.accept()
        await self.channel_layer.group_add(str(self.game.id), self.channel_name)
        message = await sync_to_async(lambda: EventGameSerializer(instance=self.game).data)()
        await self.send_json({"type": "game_message", "game": message})

    async def disconnect(self, code):
        print("Disconnected!")
        return await super().disconnect(code)

    async def receive_json(self, content, **kwargs):
        message_type = content["type"]
        if message_type == "begin_game_period":
            self.game = await self.begin_game_period()
            message = await sync_to_async(lambda: EventGameSerializer(instance=self.game).data)()
            await self.channel_layer.group_send(str(self.game.id), {"type": "game_message", "game": message})

        if message_type == "end_game_period":
            self.game = await self.end_game_period()
            message = await sync_to_async(lambda: EventGameSerializer(instance=self.game).data)()
            await self.channel_layer.group_send(str(self.game.id), {"type": "game_message", "game": message})
        print(content)
        return await super().receive_json(content, **kwargs)

    async def game_message(self, event):
        print(event)
        await self.send_json(event)

    @sync_to_async
    def begin_game_period(self):
        if not self.game.game_periods.filter(time_end=None).exists():
            period = GamePeriod.objects.create(game=self.game)
            if not self.game.time_begin:
                self.game.time_begin = period.time_begin.time()
                self.game.save()
        game = EventGame.objects.get(id=self.game.id)
        return game

    @sync_to_async
    def end_game_period(self):
        if self.game.game_periods.filter(time_end=None).exists():
            period = self.game.game_periods.filter(time_end=None).last()
            period.time_end = timezone.now()
            period.save()
        game = EventGame.objects.get(id=self.game.id)
        return game
