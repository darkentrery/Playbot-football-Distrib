import datetime

from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from playbot.chats.models import Chat
from playbot.cities.models import City, Address
from playbot.events.models import Event, CancelReasons, EventStep, Format, DistributionMethod, Duration, CountCircles, \
    EventPlayer, Team, TeamPlayer, EventGame, EventQueue
from playbot.events.serializers import CreateEventSerializer, EventSerializer, EditEventSerializer, \
    CancelReasonsSerializer, FormatSerializer, DistributionMethodSerializer, DurationSerializer, \
    CountCirclesSerializer, SetRegulationSerializer, CancelEventSerializer, EditTeamNameSerializer
from playbot.events.utils import auto_distribution, create_teams, create_event_games
from playbot.history.models import UserEventAction


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

    def post(self, request, format='json'):
        city = request.data["city"]
        events = EventSerializer(Event.objects.filter(city__name=city, time_end=None).order_by("date", "time_begin"), many=True)
        return Response(events.data, status=status.HTTP_200_OK)


class EventView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, format='json', **kwargs):
        event = Event.objects.get(id=self.kwargs.get("id"))
        json = EventSerializer(instance=event).data
        same_events = Event.objects.filter(city=event.city).exclude(id=event.id)
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
                UserEventAction.objects.create(user=request.user, event=event, reason=reason, action=UserEventAction.Actions.CANCEL)
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
        team = Team.objects.get(id=request.data["team"]["id"])
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
        else:
            EventQueue.objects.update_or_create(player=request.user, event=event, number=event.next_queue_number)
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
            game.time_begin = datetime.datetime.now().time()
            game.save()
            event = EventSerializer(instance=game.event)
            return Response(event.data, status=status.HTTP_200_OK)
        return Response({"error": "Permission denied!"}, status=status.HTTP_400_BAD_REQUEST)





