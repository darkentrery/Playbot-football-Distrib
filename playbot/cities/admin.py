from django.contrib import admin

from playbot.cities.models import City, Address


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
