from django.contrib import admin

from playbot.cities.models import City, Address, FieldType, CoverageType, Field, FieldPhoto


class FieldPhotoInline(admin.TabularInline):
    model = FieldPhoto
    extra = 0
    list_display = [
        "photo",
    ]


@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    list_display = [
        "name",
    ]


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = [
        "country",
        "city",
        "state",
        "street",
        "house_number",
    ]


@admin.register(FieldType)
class FieldTypeAdmin(admin.ModelAdmin):
    list_display = [
        "name",
    ]


@admin.register(CoverageType)
class CoverageTypeAdmin(admin.ModelAdmin):
    list_display = [
        "name",
    ]


@admin.register(Field)
class FieldAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "address",
        "format",
        "timezone",
        "type_field",
        "coverage",
        "shower_room",
        "dressing_room",
        "lighting",
        "tribune",
        "is_active",
    ]
    inlines = [FieldPhotoInline,]


@admin.register(FieldPhoto)
class FieldPhotoAdmin(admin.ModelAdmin):
    list_display = [
        "field",
        "photo",
    ]
