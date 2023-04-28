from rest_framework import serializers

from playbot.cities.models import City, Address, FieldType, CoverageType, Field
from playbot.events.models import Format


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ["id", "name"]
        read_only_fields = fields


class AddressSerializer(serializers.ModelSerializer):
    city = serializers.SlugRelatedField(slug_field="name", read_only=True)

    class Meta:
        model = Address
        fields = ["id", "city", "country", "region", "state", "street", "house_number", "lat", "lng", "google_link",
                  "c_c_s_h_string", "c_s_h_string", "s_h_string"]
        read_only_fields = fields


class CreateAddressSerializer(serializers.ModelSerializer):
    city = serializers.SlugRelatedField(slug_field="name", queryset=City.objects.all())

    class Meta:
        model = Address
        fields = ["city", "country", "region", "state", "street", "house_number", "lat", "lng"]


class FieldTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FieldType
        fields = ["id", "name"]
        read_only_fields = fields


class CoverageTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoverageType
        fields = ["id", "name"]
        read_only_fields = fields


class FormatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Format
        fields = ["id", "name", "count", "rate"]
        read_only_fields = fields


class FieldSerializer(serializers.ModelSerializer):
    address = AddressSerializer(read_only=True)
    format = FormatSerializer(read_only=True)
    type_field = FieldTypeSerializer(read_only=True)
    coverage = CoverageTypeSerializer(read_only=True)

    class Meta:
        model = Field
        fields = ["id", "name", "address", "format", "type_field", "coverage", "shower_room", "dressing_room",
                  "lighting", "tribune"]
        read_only_fields = fields
