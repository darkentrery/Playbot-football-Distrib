from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from playbot.events.models import Event, CancelReasons, EventStep
from playbot.events.serializers import CreateEventSerializer, EventSerializer, EditEventSerializer, \
    CancelReasonsSerializer, EventStepSerializer
from playbot.users.models import User
from playbot.users.serializers import UserSerializer


class CreateEventView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, format='json'):
        if request.user.is_authenticated:
            return Response(status=status.HTTP_200_OK)

    def post(self, request, format='json'):
        data = request.data
        data.update({"organizer": request.user.pk})
        serializer = CreateEventSerializer(data=request.data)
        if serializer.is_valid():
            event = serializer.save()
            if event:
                json = EventSerializer(Event.objects.get(id=event.id)).data
                return Response(json, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EventsView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, format='json'):
        events = EventSerializer(Event.objects.all().order_by("date", "time_begin"), many=True)
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
        serializer = EditEventSerializer(event, data=request.data)
        if serializer.is_valid() and event.organizer == request.user:
            event = serializer.save()
            if event:
                json = EventSerializer(Event.objects.get(id=event.id)).data
                return Response(json, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CancelReasonsView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, format='json'):
        items = CancelReasonsSerializer(CancelReasons.objects.all(), many=True)
        return Response(items.data, status=status.HTTP_200_OK)


class EventPlayersView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, format='json', **kwargs):
        id = self.kwargs.get("id")
        players_id = Event.objects.get(id=id).event_player.all().values_list("player", flat=True)
        items = UserSerializer(User.objects.filter(id__in=players_id), many=True)
        return Response(items.data, status=status.HTTP_200_OK)


class EventStepsView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, format='json', **kwargs):
        id = self.kwargs.get("id")
        items = EventStepSerializer(EventStep.objects.filter(event_id=id), many=True)
        return Response(items.data, status=status.HTTP_200_OK)


class ToConfirmPlayersView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format='json'):
        event = Event.objects.get(id=request.data["id"])
        EventStep.objects.update_or_create(step=EventStep.StepName.STEP_1, event=event)
        items = EventStepSerializer(EventStep.objects.filter(event=event), many=True)
        return Response(items.data, status=status.HTTP_200_OK)


