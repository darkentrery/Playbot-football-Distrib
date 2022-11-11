from django.contrib import admin

from playbot.cities.models import City


@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    list_display = [
        "name",
    ]
