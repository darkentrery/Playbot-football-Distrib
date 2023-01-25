from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone
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
    # rank = models.FloatField(_("Rank"), default=0)
    gender = models.CharField(_("Gender"), max_length=50, choices=Gender.choices, default=Gender.MALE)
    position_1 = models.ForeignKey(Position, on_delete=models.SET_NULL, related_name="users_position_1", blank=True, null=True)
    position_2 = models.ForeignKey(Position, on_delete=models.SET_NULL, related_name="users_position_2", blank=True, null=True)
    birthday = models.DateField(_("Birthday"), blank=True, null=True)
    photo = models.ImageField(upload_to="photos", verbose_name="Photo", blank=True, null=True)
    about_self = models.TextField(_("About Self"), blank=True, null=True)
    favorite_events = models.ManyToManyField("events.Event", related_name="in_favorites", blank=True)
    penalty = models.PositiveIntegerField(_("Penalty"), default=0)
    involvement = models.PositiveIntegerField(_("Involvement"), default=1)
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

    @property
    def count_goals(self):
        return self.goals.all().count()

    @property
    def wins(self):
        wins = 0
        for team_player in self.team_players.all():
            wins += team_player.team.wins
        return wins

    @property
    def loss(self):
        loss = 0
        for team_player in self.team_players.all():
            loss += team_player.team.loss
        return loss

    @property
    def nothing(self):
        nothing = 0
        for team_player in self.team_players.all():
            nothing += team_player.team.nothing
        return nothing

    @property
    def wins_percent(self):
        percent = 0
        if self.all_games:
            percent = 100 * self.wins / self.all_games
        return percent

    @property
    def total_time(self):
        time = 0
        for team_player in self.team_players.all():
            for event_game in team_player.team.event_games_teams_1.all():
                time += event_game.current_duration
            for event_game in team_player.team.event_games_teams_2.all():
                time += event_game.current_duration
        return time

    @property
    def all_rivals(self):
        users_id = []
        for team_player in self.team_players.all():
            for event_game in team_player.team.event_games_teams_1.all():
                if event_game.current_duration:
                    users_id += list(event_game.team_2.team_players.all().values_list("player_id", flat=True))
            for event_game in team_player.team.event_games_teams_2.all():
                if event_game.current_duration:
                    users_id += list(event_game.team_1.team_players.all().values_list("player_id", flat=True))
        return len(set(users_id))

    @property
    def rank(self):
        if self.ranks_history.all().exists():
            return self.ranks_history.all().first().rank
        else:
            return 0

    @property
    def same_players(self):
        players_id = []
        players = User.objects.filter(gender=self.gender)
        for player in players:
            if self.wins_percent - 5 <= player.wins_percent <= self.wins_percent + 5:
                players_id.append([player.id, player.wins_percent])
        players_id.sort(key=lambda x: x[1], reverse=True)
        players_id = [id[0] for id in players_id]
        players = User.objects.filter(id__in=players_id)
        count = 10 if players.count() >= 10 else players.count()
        return players[:count]


class RankHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="ranks_history")
    rank = models.FloatField(_("Rank"), default=5)
    create = models.DateTimeField(_("Time Create"), default=timezone.now)

    class Meta:
        ordering = ["create",]
        verbose_name = "Rank History"
        verbose_name_plural = "Ranks History"

    def __str__(self):
        return f"{self.user.email}" or f"{self.user.username}"




