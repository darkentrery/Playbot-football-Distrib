import datetime

from asgiref.sync import sync_to_async
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from django.utils import timezone
from loguru import logger

from playbot.events.models import EventGame, GamePeriod, Goal, Event
from playbot.events.serializers import EventGameSerializer, CreateGoalSerializer, UpdateGoalSerializer, EventSerializer
from playbot.events.utils import RankCalculation
from playbot.users.models import RankHistory


class EventGameConsumer(AsyncJsonWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(args, kwargs)
        self.game = None

    async def connect(self):
        print("Connected!")
        self.user = self.scope["user"]
        id = self.scope["url_route"]["kwargs"]["id"]
        self.game = await sync_to_async(lambda: EventGame.objects.get(id=id))()
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

        match message_type:
            case "begin_game_period":
                await self.begin_game_period()
            case "end_game_period":
                await self.end_game_period()
            case "create_goal":
                await self.create_goal(content)
            case "update_goal":
                await self.update_goal(content)
            case "delete_goal":
                await self.delete_goal(content)
            case "end_game":
                await self.end_game()
            case "end_event":
                await self.end_event()
            case _:
                logger.debug(f"Not allow message type!")

        message = await sync_to_async(lambda: EventGameSerializer(instance=self.game).data)()
        response = {"type": "game_message", "game": message}
        if message_type == "end_game" or message_type == "end_event":
            event = await sync_to_async(lambda: EventSerializer(instance=self.game.event).data)()
            response.update({
                "event": event,
                "type": "event_game_message"
            })
        await self.channel_layer.group_send(str(self.game.id), response)
        return await super().receive_json(content, **kwargs)

    async def game_message(self, event):
        await self.send_json(event)

    async def event_game_message(self, event):
        await self.send_json(event)

    @sync_to_async
    def begin_game_period(self):
        if not self.game.game_periods.filter(time_end=None).exists():
            period = GamePeriod.objects.create(game=self.game)
            if not self.game.time_begin:
                self.game.time_begin = period.time_begin.time()
                self.game.save()

    @sync_to_async
    def end_game_period(self):
        if self.game.game_periods.filter(time_end=None).exists():
            period = self.game.game_periods.filter(time_end=None).last()
            period.time_end = timezone.now()
            period.save()

    @sync_to_async
    def create_goal(self, content):
        serializer = CreateGoalSerializer(data=content["data"])
        if serializer.is_valid():
            goal = serializer.save()
            if goal:
                if self.game.game_periods.filter(time_end=None).exists():
                    period = self.game.game_periods.filter(time_end=None).last()
                    period.time_end = goal.time
                    period.save()
                    goal.game_time = self.game.current_duration
                    goal.save()

    @sync_to_async
    def update_goal(self, content):
        goal = Goal.objects.get(id=content["data"].get("id"))
        serializer = UpdateGoalSerializer(instance=goal, data=content["data"])
        if serializer.is_valid():
            serializer.save()

    @sync_to_async
    def delete_goal(self, content):
        goal = Goal.objects.get(id=content["data"].get("id"))
        goal.delete()

    @sync_to_async
    def end_game(self):
        time = timezone.now()
        if not self.game.rest_time:
            if self.game.game_periods.filter(time_end=None).exists():
                period = self.game.game_periods.filter(time_end=None).last()
                duration = self.game.event.duration.duration * 60 + period.duration - self.game.current_duration
                time = period.time_begin + datetime.timedelta(seconds=duration)

        if self.game.game_periods.filter(time_end=None).exists():
            period = self.game.game_periods.filter(time_end=None).last()
            period.time_end = time
            period.save()
        self.game.time_end = time.time()
        self.game.save()
        event = self.game.event
        if not event.event_games.filter(time_end=None).exists():
            event.time_end = self.game.time_end
            event.save()

            self.update_rank()

    @sync_to_async
    def end_event(self):
        event = self.game.event
        event.time_end = timezone.now().time()
        event.save()
        for game in event.event_games.filter(time_end=None):
            game.time_end = event.time_end
            game.save()
        for game in event.event_games.filter(time_begin=None):
            game.time_begin = event.time_end
            game.save()

        self.update_rank()

    def update_rank(self):
        for game in self.game.event.event_games.all():
            for player in game.team_1.team_players.all():
                rank = RankCalculation(player.player, self.game.event, game=game).get_next_rank_after_game()
                event_player = self.game.event.event_player.get(player_id=player.player.id)
                if event_player.played - 1 == RankHistory.objects.filter(user=player.player, event=self.game.event).count():
                    rank += 0.01
                RankHistory.objects.create(user=player.player, rank=rank, event=self.game.event)

            for player in game.team_2.team_players.all():
                rank = RankCalculation(player.player, self.game.event, game=game).get_next_rank_after_game()
                event_player = self.game.event.event_player.get(player_id=player.player.id)
                if event_player.played - 1 == RankHistory.objects.filter(user=player.player, event=self.game.event).count():
                    rank += 0.01
                RankHistory.objects.create(user=player.player, rank=rank, event=self.game.event)
