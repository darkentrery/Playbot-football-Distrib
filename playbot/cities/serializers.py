from rest_framework import serializers

from playbot.cities.models import City, Address


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = "__all__"


class AddressSerializer(serializers.ModelSerializer):
    city = serializers.SlugRelatedField(queryset=City.objects.all(), slug_field="name")

    class Meta:
        model = Address
        fields = "__all__"
        # read_only_fields = fields