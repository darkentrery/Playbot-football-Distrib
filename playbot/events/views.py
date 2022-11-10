from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.utils import json
from rest_framework.views import APIView

from playbot.events.models import City
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


class CitiesView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, format='json'):
        cities = list(City.objects.all().values_list("name", flat=True))
        response = json.dumps({"cities": cities})
        response = json.loads(response)
        return Response(response, status=status.HTTP_200_OK)
