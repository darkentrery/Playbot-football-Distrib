from rest_framework import serializers

from playbot.cities.models import City, Address


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = "__all__"


class AddressSerializer(serializers.ModelSerializer):
    city = serializers.SlugRelatedField(queryset=City.objects.all(), slug_field="name")
    region = serializers.CharField(max_length=150, required=False)
    state = serializers.CharField(max_length=150, required=False)
    street = serializers.CharField(max_length=150, required=False)
    house_number = serializers.CharField(max_length=150, required=False)

    class Meta:
        model = Address
        fields = "__all__"