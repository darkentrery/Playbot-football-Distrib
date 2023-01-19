from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

from playbot.cities.models import City


class Position(models.Model):
    name = models.CharField(_("Position"), max_length=150, unique=True)

    class Meta:
        verbose_name = "Position"
        verbose_name_plural = "Positions"

    def __str__(self):
        return f"{self.name}"


class User(AbstractUser):
    class Gender(models.TextChoices):
        MALE = "Муж.", _("Муж.")
        FEMALE = "Жен.", _("Жен.")

    email = models.EmailField(_("Email Address"), unique=True, blank=True, null=True)
    first_name = models.CharField(_("First Name"), max_length=150, blank=True)
    username = models.CharField(_("Username"), max_length=150, unique=True, blank=True, null=True)
    last_name = models.CharField(_("Last Name"), max_length=150, blank=True)
    name = models.CharField(_("Name"), max_length=150)
    phone_number = models.CharField(_("Phone Number"), max_length=255, blank=True, null=True, unique=True)
    telegram_id = models.IntegerField(_("Telegram Id"), blank=True, null=True, unique=True)
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name="user", blank=True, null=True)
    rank = models.FloatField(_("Rank"), default=0)
    gender = models.CharField(_("Gender"), max_length=50, choices=Gender.choices, default=Gender.MALE)
    position_1 = models.ForeignKey(Position, on_delete=models.SET_NULL, related_name="users_position_1", blank=True, null=True)
    position_2 = models.ForeignKey(Position, on_delete=models.SET_NULL, related_name="users_position_2", blank=True, null=True)
    birthday = models.DateField(_("Birthday"), blank=True, null=True)
    photo = models.ImageField(upload_to="photos", verbose_name="Photo", blank=True, null=True)
    about_self = models.TextField(_("About Self"), blank=True, null=True)
    favorite_events = models.ManyToManyField("events.Event", related_name="in_favorites", blank=True)
    is_active = models.BooleanField(
        _("active"),
        default=False,
        help_text=_(
            "Designates whether this user should be treated as active. "
            "Unselect this instead of deleting accounts."
        ),
    )
    confirm_slug = models.CharField(_("Confirm Slug"), max_length=150, blank=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"

    def __str__(self):
        return f"{self.email}" or f"{self.username}"

    @property
    def all_games(self):
        return self.event_player.all().count()


