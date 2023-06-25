from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from playbot.telegram.models import TelegramChannel
from playbot.telegram.serializers import TelegramChannelSerializer, UpdateTelegramChannelSerializer, \
    CreateTelegramChannelSerializer
from playbot.users.models import User


class GetChannelsView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, format='json', **kwargs):
        channels = TelegramChannelSerializer(TelegramChannel.objects.all(), many=True)
        return Response(channels.data, status=status.HTTP_200_OK)


class GetChannelsByAdminView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, format='json', **kwargs):
        channels = TelegramChannelSerializer(TelegramChannel.objects.filter(admins__id__in=[self.kwargs.get("id")], has_bot=True), many=True)
        return Response(channels.data, status=status.HTTP_200_OK)


class UpdateChannelView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format='json'):
        channel = TelegramChannel.objects.get(channel_id=request.data["channel_id"])
        if request.data.get("admins"):
            users = [id for id in request.data["admins"] if id in User.objects.filter(telegram_id__isnull=False).values_list("telegram_id", flat=True)]
            request.data["admins"] = users
        serializer = UpdateTelegramChannelSerializer(channel, data=request.data)
        if serializer.is_valid():
            channel = serializer.save()
            if channel:
                json = TelegramChannelSerializer(TelegramChannel.objects.get(id=channel.id)).data
                return Response(json, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CreateChannelView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format='json'):
        if request.data.get("admins"):
            users = [id for id in request.data["admins"] if id in User.objects.filter(telegram_id__isnull=False).values_list("telegram_id", flat=True)]
            request.data["admins"] = users
        serializer = CreateTelegramChannelSerializer(data=request.data)
        if serializer.is_valid():
            channel = serializer.save()
            if channel:
                json = TelegramChannelSerializer(TelegramChannel.objects.get(id=channel.id)).data
                return Response(json, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteChannelView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format='json'):
        channel = TelegramChannel.objects.get(channel_id=request.data["channel_id"])
        channel.delete()
        return Response({}, status=status.HTTP_200_OK)
