from django.db import models
from django.utils.translation import gettext_lazy as _


class City(models.Model):
    name = models.CharField(_("City"), max_length=150)

    class Meta:
        verbose_name = "City"
        verbose_name_plural = "Cities"
        ordering = ["name"]

    def __str__(self):
        return f"{self.name}"


class Address(models.Model):
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name="address")
    country = models.CharField(_("Country"), max_length=150)
    region = models.CharField(_("Region"), max_length=150, blank=True, null=True)
    state = models.CharField(_("State"), max_length=150, blank=True, null=True)
    street = models.CharField(_("Street"), max_length=150, blank=True, null=True)
    house_number = models.CharField(_("House Number"), max_length=150, blank=True, null=True)
    lat = models.FloatField(_("Lat"), blank=True, null=True)
    lng = models.FloatField(_("Lng"), blank=True, null=True)

    class Meta:
        verbose_name = "Address"
        verbose_name_plural = "Addresses"

    def __str__(self):
        return f"{self.country} - {self.city.name}"

