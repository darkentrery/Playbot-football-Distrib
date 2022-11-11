from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from playbot.cities.models import City


class CitiesView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, format='json'):
        cities = list(City.objects.all().values_list("name", flat=True))
        return Response({"cities": cities}, status=status.HTTP_200_OK)
