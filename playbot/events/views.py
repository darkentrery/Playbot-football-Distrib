import datetime

from django.utils import timezone
from loguru import logger
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from playbot.chats.models import Chat
from playbot.cities.models import City, Address
from playbot.events.models import Event, CancelReasons, EventStep, Format, DistributionMethod, Duration, CountCircles, \
    EventPlayer, Team, TeamPlayer, EventGame, EventQueue, GamePeriod
from playbot.events.serializers import CreateEventSerializer, EventSerializer, EditEventSerializer, \
    CancelReasonsSerializer, FormatSerializer, DistributionMethodSerializer, DurationSerializer, \
    CountCirclesSerializer, SetRegulationSerializer, CancelEventSerializer, EditTeamNameSerializer, EventGameSerializer, \
    CreateGoalSerializer, EventListSerializer
from playbot.events.utils import auto_distribution, create_teams, create_event_games, get_next_rank
from playbot.history.models import UserEventAction
from playbot.users.models import RankHistory
from playbot.users.serializers import UserSerializer


class CreateEventView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, format='json'):
        if request.user.is_authenticated:
            return Response(status=status.HTTP_200_OK)

    def post(self, request, format='json'):
        data = request.data
        data.update({"organizer": request.user.pk})
        city, creat = City.objects.get_or_create(name=request.data["address"]["city"])
        address, creat = Address.objects.get_or_create(
            country=request.data["address"]["country"],
            city=city,
            region=request.data["address"].get("region"),
            state=request.data["address"].get("state"),
            street=request.data["address"].get("street"),
            house_number=request.data["address"].get("house_number"),
            lat=request.data["address"].get("lat"),
            lng=request.data["address"].get("lng"),
        )
        request.data["address"] = address.id
        serializer = CreateEventSerializer(data=request.data)
        if serializer.is_valid():
            event = serializer.save()
            if event:
                Chat.objects.update_or_create(event=event)
                UserEventAction.objects.create(user=request.user, event=event, action=UserEventAction.Actions.CREATE)
                if event.is_player and not event.event_player.filter(player=request.user):
                    EventPlayer.objects.create(player=request.user, event=event)
                json = EventSerializer(Event.objects.get(id=event.id)).data
                return Response(json, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EventsView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, format='json', **kwargs):
        events = EventListSerializer(Event.objects.all().order_by("date", "time_begin"), many=True)
        return Response(events.data, status=status.HTTP_200_OK)


class EventsCityView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, format='json', **kwargs):
        city = self.kwargs.get("city")
        events = EventListSerializer(Event.objects.filter(address__city__name=city, cancel=False).order_by("date", "time_begin"), many=True)
        return Response(events.data, status=status.HTTP_200_OK)


class EventView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, format='json', **kwargs):
        event = Event.objects.get(id=self.kwargs.get("id"))
        json = EventSerializer(instance=event).data
        same_events = Event.objects.filter(city=event.address.city, date__gte=timezone.now().date()).exclude(id=event.id)
        ids = [event.id for event in same_events if not event.is_begin and not event.is_end]
        same_events = Event.objects.filter(id__in=ids)
        count = min(3, same_events.count())
        same_events = same_events[:count]
        same_events = EventSerializer(same_events, many=True).data
        return Response({"event": json, "same_events": same_events}, status=status.HTTP_200_OK)


class EditEventView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format='json'):
        event = Event.objects.get(id=request.data["id"])
        city, creat = City.objects.update_or_create(name=request.data["address"]["city"])
        address, creat = Address.objects.get_or_create(
            country=request.data["address"]["country"],
            city=city,
            region=request.data["address"].get("region"),
            state=request.data["address"].get("state"),
            street=request.data["address"].get("street"),
            house_number=request.data["address"].get("house_number"),
            lat=request.data["address"].get("lat"),
            lng=request.data["address"].get("lng"),
        )
        request.data["address"] = address.id
        serializer = EditEventSerializer(event, data=request.data)
        if serializer.is_valid() and event.organizer == request.user:
            event = serializer.save()
            if event:
                if event.is_player and not event.event_player.filter(player=request.user):
                    EventPlayer.objects.create(player=request.user, event=event)
                elif not event.is_player and event.event_player.filter(player=request.user):
                    EventPlayer.objects.get(player=request.user, event=event).delete()
                    if event.first_order_queue:
                        EventPlayer.objects.update_or_create(player=event.first_order_queue, event=event)
                        EventQueue.objects.get(player=event.first_order_queue).delete()
                json = EventSerializer(Event.objects.get(id=event.id)).data
                return Response(json, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CancelReasonsView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, format='json'):
        items = CancelReasonsSerializer(CancelReasons.objects.filter(id__in=[1, 2, 3]), many=True)
        return Response(items.data, status=status.HTTP_200_OK)


class CancelEventView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format='json'):
        event = Event.objects.get(id=request.data["id"])
        reason, create = CancelReasons.objects.get_or_create(name=request.data["cancel_reasons"])
        serializer = CancelEventSerializer(event, data=request.data)
        if serializer.is_valid() and event.organizer == request.user:
            event = serializer.save()
            if event:
                RankHistory.objects.create(user=request.user, rank=request.user.rank * 0.98)
                UserEventAction.objects.create(user=request.user, event=event, reason=reason, action=UserEventAction.Actions.CANCEL)
                event.notice_cancel_event()
                json = EventSerializer(Event.objects.get(id=event.id)).data
                return Response(json, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ToConfirmPlayersView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format='json'):
        event = Event.objects.get(id=request.data["id"])
        EventStep.objects.update_or_create(step=EventStep.StepName.STEP_1, event=event)
        json = EventSerializer(instance=Event.objects.get(id=request.data["id"])).data
        return Response(json, status=status.HTTP_200_OK)


class ConfirmPlayersView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format='json'):
        players = request.data["players"]
        event = Event.objects.get(id=request.data["event"]["id"])
        event_players = event.event_player.all()
        for player in event_players:
            if not (str(player.player.id) in players):
                player.delete()

        EventStep.objects.update_or_create(step=EventStep.StepName.STEP_1, event=event, defaults={"complete": True})
        EventStep.objects.update_or_create(step=EventStep.StepName.STEP_2, event=event)
        json = EventSerializer(instance=Event.objects.get(id=request.data["event"]["id"])).data

        return Response(json, status=status.HTTP_200_OK)


class GetRegulationView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, format='json', **kwargs):
        formats = FormatSerializer(Format.objects.all(), many=True)
        distribution_method = DistributionMethodSerializer(DistributionMethod.objects.all(), many=True)
        duration = DurationSerializer(Duration.objects.all(), many=True)
        count_circles = CountCirclesSerializer(CountCircles.objects.all(), many=True)
        data = {
            "formats": formats.data,
            "distribution_method": distribution_method.data,
            "duration": duration.data,
            "count_circles": count_circles.data,
        }

        return Response(data, status=status.HTTP_200_OK)


class SetRegulationView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format='json'):
        id = request.data.pop("id")
        event = Event.objects.get(id=id)
        if request.data.get("until_goal_count") == "null":
            request.data["until_goal_count"] = None
        serializer = SetRegulationSerializer(instance=event, data=request.data)
        if serializer.is_valid() and event.organizer == request.user:
            event = serializer.save()
            if event:
                create_teams(event)
                create_event_games(event)
                if event.distribution_method.name == "Автоматический":
                    teams = auto_distribution(event)
                    for team in teams:
                        for player in team["players"]:
                            TeamPlayer.objects.create(player_id=player[0], team_id=team["id"])
                else:
                    for team in event.teams.all():
                        for player in team.team_players.all():
                            player.delete()

                EventStep.objects.update_or_create(step=EventStep.StepName.STEP_2, event=event, defaults={"complete": True})
                EventStep.objects.update_or_create(step=EventStep.StepName.STEP_3, event=event)
                json = EventSerializer(Event.objects.get(id=id)).data
                return Response(json, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ConfirmTeamPlayersView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format='json'):
        team = Team.objects.get(id=request.data["team"].pop("id"))
        serializer = EditTeamNameSerializer(instance=team, data=request.data["team"])
        if serializer.is_valid() and team.event.organizer == request.user:
            team = serializer.save()
            for player in team.team_players.all():
                player.delete()
            for id in request.data["players"]:
                TeamPlayer.objects.create(team=team, player_id=id)
            json = EventSerializer(instance=team.event).data
            return Response(json, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ConfirmTeamsView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format='json'):
        event = Event.objects.get(id=request.data["event"]["id"])
        for team in request.data["event"]["teams"]:
            serializer = EditTeamNameSerializer(instance=Team.objects.get(id=team["id"]), data=team)
            if serializer.is_valid() and event.organizer == request.user:
                serializer.save()
        EventStep.objects.update_or_create(step=EventStep.StepName.STEP_3, event=event, defaults={"complete": True})
        json = EventSerializer(instance=event).data
        return Response(json, status=status.HTTP_200_OK)


class JoinPlayerView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format='json'):
        event = Event.objects.get(id=request.data.get("id"))
        if event.event_player.all().count() < event.count_players:
            EventPlayer.objects.update_or_create(player=request.user, event=event)
            event.notice_join_to_event(request.user)
            event.notice_new_player()
            if event.event_player.all().count() == event.count_players:
                event.notice_complete_players()
        else:
            EventQueue.objects.update_or_create(player=request.user, event=event, number=event.next_queue_number)
            event.notice_not_places_in_event(request.user)
        UserEventAction.objects.create(user=request.user, event=event)
        event = EventSerializer(instance=event)
        return Response(event.data, status=status.HTTP_200_OK)


class LeaveEventView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format='json'):
        event = Event.objects.get(id=request.data["event"]["id"])
        reason, create = CancelReasons.objects.update_or_create(name=request.data["reason"])
        event_player = EventPlayer.objects.filter(player=request.user, event=event)
        if event_player.exists():
            event_player.delete()
            RankHistory.objects.create(user=request.user, rank=request.user.rank * 0.99)
            if event.first_order_queue:
                EventPlayer.objects.update_or_create(player=event.first_order_queue, event=event)
                EventQueue.objects.get(player=event.first_order_queue).delete()
        else:
            if event.event_queues.filter(player=request.user).exists():
                EventQueue.objects.get(player=request.user, event=event).delete()
        UserEventAction.objects.create(user=request.user, event=event, reason=reason, action=UserEventAction.Actions.LEAVE)
        event = EventSerializer(instance=event)
        return Response(event.data, status=status.HTTP_200_OK)


class BeginEventGameView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format='json'):
        game = EventGame.objects.get(id=request.data["game"]["id"])
        if game.event.organizer == request.user:
            game.time_begin = timezone.now().time()
            game.save()
            event = EventSerializer(instance=game.event)
            return Response(event.data, status=status.HTTP_200_OK)
        return Response({"error": "Permission denied!"}, status=status.HTTP_400_BAD_REQUEST)


class EndEventView(APIView):
    permission_classes = (IsAuthenticated,)

    @logger.catch
    def post(self, request, format='json'):
        event = Event.objects.get(id=request.data["id"])
        if event.organizer == request.user:
            event.time_end = timezone.now().time()
            event.save()
            if event.event_games.filter(time_end=None).exists():
                game = event.event_games.filter(time_end=None).last()
                game.time_end = event.time_end
                game.save()
            for player in event.event_player.all():
                rank = get_next_rank(player.player, event)
                RankHistory.objects.create(user=player.player, rank=rank, event=event)
            event = EventSerializer(instance=event)
            return Response(event.data, status=status.HTTP_200_OK)
        return Response({"error": "Permission denied!"}, status=status.HTTP_400_BAD_REQUEST)


class BeginGamePeriodView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format='json'):
        game = EventGame.objects.get(id=request.data["id"])
        if game.event.organizer == request.user:
            if not game.game_periods.filter(time_end=None).exists():
                period = GamePeriod.objects.create(game=game)
                if not game.time_begin:
                    game.time_begin = period.time_begin.time()
                    game.save()
                event = EventSerializer(instance=game.event).data
                game = EventGameSerializer(instance=game).data
                return Response({"event": event, "game": game}, status=status.HTTP_200_OK)
        return Response({"error": "Permission denied!"}, status=status.HTTP_400_BAD_REQUEST)


class EndGamePeriodView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format='json'):
        game = EventGame.objects.get(id=request.data["id"])
        if game.event.organizer == request.user:
            if game.game_periods.filter(time_end=None).exists():
                period = game.game_periods.filter(time_end=None).last()
                period.time_end = timezone.now()
                period.save()
                event = EventSerializer(instance=game.event).data
                game = EventGameSerializer(instance=game).data
                return Response({"event": event, "game": game}, status=status.HTTP_200_OK)
        return Response({"error": "Permission denied!"}, status=status.HTTP_400_BAD_REQUEST)


class EndGameView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format='json'):
        game = EventGame.objects.get(id=request.data["id"])
        if game.event.organizer == request.user and not game.time_end:
            time = timezone.now() - datetime.timedelta(seconds=game.current_duration - game.event.duration.duration * 60)
            if game.game_periods.filter(time_end=None).exists():
                period = game.game_periods.filter(time_end=None).last()
                period.time_end = time
                period.save()
            game.time_end = time.time()
            game.save()
            event = game.event
            if not event.event_games.filter(time_end=None).exists():
                event.time_end = game.time_end
                event.save()
                for player in event.event_player.all():
                    rank = get_next_rank(player.player, event)
                    RankHistory.objects.create(user=player.player, rank=rank, event=event)
            event = EventSerializer(instance=game.event).data
            game = EventGameSerializer(instance=game).data
            return Response({"event": event, "game": game}, status=status.HTTP_200_OK)
        return Response({"error": "Permission denied!"}, status=status.HTTP_400_BAD_REQUEST)


class CreateGoalView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format='json'):
        game = EventGame.objects.get(id=request.data.get("game"))
        if game.event.organizer == request.user:
            serializer = CreateGoalSerializer(data=request.data)
            if serializer.is_valid():
                goal = serializer.save()
                if goal:
                    event = EventSerializer(instance=game.event).data
                    game = EventGameSerializer(instance=goal.game).data
                    return Response({"event": event, "game": game}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({"error": "Permission denied!"}, status=status.HTTP_400_BAD_REQUEST)


class AddToFavoritesView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format='json'):
        event = Event.objects.get(id=request.data["id"])
        if not request.user.favorite_events.filter(id=event.id).exists():
            request.user.favorite_events.add(event)
            json = UserSerializer(instance=request.user).data
            return Response(json, status=status.HTTP_200_OK)
        return Response({"error": "Already in favorites!"}, status=status.HTTP_400_BAD_REQUEST)


class RemoveFromFavoritesView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format='json'):
        event = Event.objects.get(id=request.data["id"])
        if request.user.favorite_events.filter(id=event.id).exists():
            request.user.favorite_events.remove(event)
            json = UserSerializer(instance=request.user).data
            return Response(json, status=status.HTTP_200_OK)
        return Response({"error": "Not in favorites!"}, status=status.HTTP_400_BAD_REQUEST)





