from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from playbot.events.serializers import CreateEventSerializer


class CreateEventView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, format='json'):
        if request.user.is_authenticated:
            return Response(status=status.HTTP_200_OK)

    def post(self, request, format='json'):
        serializer = CreateEventSerializer(data=request.data)
        if serializer.is_valid():
            event = serializer.save()
            if event:
                json = serializer.validated_data
                return Response(json, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
