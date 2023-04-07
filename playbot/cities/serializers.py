from rest_framework import serializers

from playbot.cities.models import City, Address


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ["id", "name"]
        read_only_fields = fields


class AddressSerializer(serializers.ModelSerializer):
    city = serializers.SlugRelatedField(slug_field="name", read_only=True)

    class Meta:
        model = Address
        fields = ["id", "city", "country", "region", "state", "street", "house_number", "lat", "lng"]
        read_only_fields = fields


class CreateAddressSerializer(serializers.ModelSerializer):
    city = serializers.SlugRelatedField(slug_field="name", queryset=City.objects.all())

    class Meta:
        model = Address
        fields = ["city", "country", "region", "state", "street", "house_number", "lat", "lng"]
