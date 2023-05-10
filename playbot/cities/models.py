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
        street = f" - {self.street}" if self.street else ""
        house_number = f" - {self.house_number}" if self.house_number else ""
        return f"{self.country} - {self.city.name}" + street + house_number

    @property
    def google_link(self):
        return f"https://www.google.com/maps/search/{self.lat},+{self.lng}?shorturl=1"

    def string_format(self, country=True, city=True):
        options = []
        if country:
            options.append(self.country)
        if city:
            options.append(self.city.name)
        if self.street:
            options.append(self.street)
        if self.house_number:
            options.append(self.house_number)
        return " - ".join(options)

    @property
    def c_c_s_h_string(self):
        return self.string_format(country=True, city=True)

    @property
    def c_s_h_string(self):
        return self.string_format(country=False, city=True)

    @property
    def s_h_string(self):
        return self.string_format(country=False, city=False)


class FieldType(models.Model):
    name = models.CharField(_("Field Type"), max_length=150)

    class Meta:
        verbose_name = "Field Type"
        verbose_name_plural = "Field Types"

    def __str__(self):
        return f"{self.name}"


class CoverageType(models.Model):
    name = models.CharField(_("Coverage Type"), max_length=150)

    class Meta:
        verbose_name = "Coverage Type"
        verbose_name_plural = "Coverage Types"

    def __str__(self):
        return f"{self.name}"

class Field(models.Model):
    name = models.CharField(_("Name"), max_length=255)
    address = models.ForeignKey(Address, on_delete=models.CASCADE, related_name="fields")
    format = models.ForeignKey("events.Format", on_delete=models.CASCADE, related_name="fields")
    type_field = models.ForeignKey(FieldType, on_delete=models.CASCADE, related_name="fields")
    coverage = models.ForeignKey(CoverageType, on_delete=models.CASCADE, related_name="fields")
    shower_room = models.BooleanField(_("Shower Room"), default=False)
    dressing_room = models.BooleanField(_("Dressing Room"), default=False)
    lighting = models.BooleanField(_("Lighting"), default=False)
    tribune = models.BooleanField(_("Tribunes"), default=False)
    is_active = models.BooleanField(_("Is Active"), default=True)

    class Meta:
        verbose_name = "Field"
        verbose_name_plural = "Fields"

    def __str__(self):
        return f"{self.name}"


class FieldPhoto(models.Model):
    field = models.ForeignKey(Field, on_delete=models.CASCADE, related_name="field_photos")
    photo = models.ImageField(_("Photo"), upload_to="photo/")

    class Meta:
        verbose_name = "Field Photo"
        verbose_name_plural = "Field Photos"

    def __str__(self):
        return f"{self.field.__str__()}"
