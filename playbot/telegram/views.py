from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from playbot.telegram.models import TelegramChannel
from playbot.telegram.serializers import TelegramChannelSerializer


class GetChannelsView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, format='json', **kwargs):
        channels = TelegramChannelSerializer(TelegramChannel.objects.all(), many=True)
        return Response(channels.data, status=status.HTTP_200_OK)


class GetChannelsByAdminView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, format='json', **kwargs):
        channels = TelegramChannelSerializer(TelegramChannel.objects.filter(admin_id=self.kwargs.get("id")), many=True)
        return Response(channels.data, status=status.HTTP_200_OK)
