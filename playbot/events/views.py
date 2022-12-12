from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from playbot.cities.models import City
from playbot.events.models import Event, CancelReasons, EventStep, Format, DistributionMethod, Duration, CountCircles, \
    EventPlayer
from playbot.events.serializers import CreateEventSerializer, EventSerializer, EditEventSerializer, \
    CancelReasonsSerializer, FormatSerializer, DistributionMethodSerializer, DurationSerializer, \
    CountCirclesSerializer, SetRegulationSerializer
from playbot.history.models import UserEventAction


class CreateEventView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, format='json'):
        if request.user.is_authenticated:
            return Response(status=status.HTTP_200_OK)

    def post(self, request, format='json'):
        data = request.data
        data.update({"organizer": request.user.pk})
        City.objects.update_or_create(name=request.data["city"])
        serializer = CreateEventSerializer(data=request.data)
        if serializer.is_valid():
            event = serializer.save()
            if event:
                if event.is_player and not event.event_player.filter(player=request.user):
                    EventPlayer.objects.create(player=request.user, event=event)
                json = EventSerializer(Event.objects.get(id=event.id)).data
                return Response(json, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EventsView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, format='json'):
        city = request.data["city"]
        events = EventSerializer(Event.objects.filter(city__name=city).order_by("date", "time_begin"), many=True)
        return Response(events.data, status=status.HTTP_200_OK)


class EventView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, format='json', **kwargs):
        id = self.kwargs.get("id")
        event = EventSerializer(Event.objects.get(id=id)).data
        return Response(event, status=status.HTTP_200_OK)


class EditEventView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format='json'):
        event = Event.objects.get(id=request.data["id"])
        City.objects.update_or_create(name=request.data["city"])
        if request.data.get("cancel_reasons"):
            CancelReasons.objects.update_or_create(name=request.data["cancel_reasons"])
        serializer = EditEventSerializer(event, data=request.data)
        if serializer.is_valid() and event.organizer == request.user:
            event = serializer.save()
            if event:
                if event.is_player and not event.event_player.filter(player=request.user):
                    EventPlayer.objects.create(player=request.user, event=event)
                elif not event.is_player and event.event_player.filter(player=request.user):
                    EventPlayer.objects.get(player=request.user, event=event).delete()
                json = EventSerializer(Event.objects.get(id=event.id)).data
                return Response(json, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CancelReasonsView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, format='json'):
        items = CancelReasonsSerializer(CancelReasons.objects.filter(id__in=[1, 2, 3]), many=True)
        return Response(items.data, status=status.HTTP_200_OK)


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
                EventStep.objects.update_or_create(step=EventStep.StepName.STEP_2, event=event, defaults={"complete": True})
                EventStep.objects.update_or_create(step=EventStep.StepName.STEP_3, event=event)
                json = EventSerializer(Event.objects.get(id=id)).data
                return Response(json, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class JoinPlayerView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format='json'):
        event = Event.objects.get(id=request.data.get("id"))
        EventPlayer.objects.update_or_create(player=request.user, event=event)
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
        UserEventAction.objects.create(user=request.user, event=event, reason=reason, action=UserEventAction.Actions.LEAVE)
        event = EventSerializer(instance=event)
        return Response(event.data, status=status.HTTP_200_OK)




