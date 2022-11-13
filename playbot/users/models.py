from django.contrib.auth.models import AbstractUser
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models
from django.utils.translation import gettext_lazy as _

from playbot.cities.models import City


class User(AbstractUser):
    email = models.EmailField(_("Email Address"), unique=True, blank=True, null=True)
    # username_validator = UnicodeUsernameValidator()
    first_name = models.CharField(_("First Name"), max_length=150, blank=True)
    username = models.CharField(_("Username"), max_length=150, blank=True)
    last_name = models.CharField(_("Last Name"), max_length=150, blank=True)
    name = models.CharField(_("Name"), max_length=150)
    phone_number = models.CharField(_("Phone Number"), max_length=255, blank=True, null=True, unique=True)
    telegram_id = models.IntegerField(_("Telegram Id"), blank=True, null=True, unique=True)
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name="user", blank=True, null=True)

    # username = models.EmailField(
    #     _("username"),
    #     max_length=150,
    #     unique=True,
    #     help_text=_(
    #         "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
    #     ),
    #     validators=[username_validator],
    #     error_messages={
    #         "unique": _("A user with that username already exists."),
    #     },
    # )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"


