import datetime

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from playbot.history.models import UserEventAction
from playbot.notices.models import Notice


class Position(models.Model):
    name = models.CharField(_("Position"), max_length=150, unique=True)
    acronym = models.CharField(_("Acronym"), max_length=150, blank=True, null=True)

    class Meta:
        verbose_name = "Position"
        verbose_name_plural = "Positions"

    def __str__(self):
        return f"{self.name}"


class Gender(models.Model):
    name = models.CharField(_("Gender Name"), max_length=150, unique=True)

    class Meta:
        verbose_name = "Gender"
        verbose_name_plural = "Gender"

    def __str__(self):
        return f"{self.name}"


class PhotoError(models.Model):
    name = models.CharField(_("Error Name"), max_length=250, unique=True)

    class Meta:
        verbose_name = "Photo Error"
        verbose_name_plural = "Photo Errors"

    def __str__(self):
        return f"{self.name}"


class User(AbstractUser):
    class Gender(models.TextChoices):
        MALE = "Парень", _("Парень")
        FEMALE = "Девушка", _("Девушка")

    email = models.EmailField(_("Email Address"), blank=True, null=True)
    first_name = models.CharField(_("First Name"), max_length=150, blank=True)
    username = models.CharField(_("Username"), max_length=150, unique=True, blank=True, null=True)
    last_name = models.CharField(_("Last Name"), max_length=150, blank=True)
    name = models.CharField(_("Name"), max_length=150)
    phone_number = models.CharField(_("Phone Number"), max_length=255, blank=True, null=True, unique=True)
    telegram_id = models.IntegerField(_("Telegram Id"), blank=True, null=True, unique=True)
    address = models.ForeignKey("cities.Address", on_delete=models.SET_NULL, related_name="users", blank=True, null=True)
    gender = models.CharField(_("Gender"), max_length=50, choices=Gender.choices, default=Gender.MALE)
    position_1 = models.ForeignKey(Position, on_delete=models.SET_NULL, related_name="users_position_1", blank=True, null=True)
    position_2 = models.ForeignKey(Position, on_delete=models.SET_NULL, related_name="users_position_2", blank=True, null=True)
    birthday = models.DateField(_("Birthday"), blank=True, null=True)
    photo = models.ImageField(upload_to="photos", verbose_name="Photo", blank=True, null=True)
    big_card_photo = models.ImageField(upload_to="photos", verbose_name="Big Card Photo", blank=True, null=True)
    small_card_photo = models.ImageField(upload_to="photos", verbose_name="Small Card Photo", blank=True, null=True)
    overlay_photo = models.ImageField(upload_to="photos", verbose_name="Overlay Photo", blank=True, null=True)
    photo_errors = models.ManyToManyField(PhotoError, related_name="users", blank=True)
    is_accept_photo = models.BooleanField(_("Is Accept Photo"), default=False)
    about_self = models.TextField(_("About Self"), blank=True, null=True)
    favorite_events = models.ManyToManyField("events.Event", related_name="in_favorites", blank=True)
    favorite_players = models.ManyToManyField("users.User", related_name="in_favorite_players", blank=True)
    penalty = models.PositiveIntegerField(_("Penalty"), default=0)
    involvement = models.PositiveIntegerField(_("Involvement"), default=1)
    rivals = models.ManyToManyField("users.User", related_name="in_rivals", blank=True, through="UserRivals")
    is_organizer = models.BooleanField(_("Is Organizer"), default=False)
    first_login = models.BooleanField(_("Is First Login"), default=True)
    is_active = models.BooleanField(
        _("active"),
        default=False,
        help_text=_(
            "Designates whether this user should be treated as active. "
            "Unselect this instead of deleting accounts."
        ),
    )
    confirm_slug = models.CharField(_("Confirm Slug"), max_length=150, blank=True)
    apple_id = models.CharField(_("Apple Id"), max_length=150, unique=True, blank=True, null=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"

    def __str__(self):
        return f"{self.email}" or f"{self.username}"

    @property
    def all_games(self):
        games = 0
        for team_player in self.team_players.all():
            games += team_player.team.event_games_teams_1.all().count()
            games += team_player.team.event_games_teams_2.all().count()
        return games

    @property
    def count_goals(self):
        return self.goals.filter(auto=False).count()

    @property
    def count_assist(self):
        return self.assistant_goals.all().count()

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
            return int(self.ranks_history.all().last().rank * 100)
        else:
            return 0

    @property
    def rank_fact(self):
        if self.ranks_history.all().exists():
            return round(self.ranks_history.all().last().rank, 2)
        else:
            return 0

    @property
    def delta_rank(self):
        delta_rank = 0
        if self.ranks_history.all().count() > 1:
            delta_rank = int((self.ranks_history.all().last().rank - self.ranks_history.all().first().rank) * 100)
        return delta_rank

    @property
    def same_players(self):
        players_id = []
        players = User.objects.filter(gender=self.gender).exclude(id=self.id)
        for player in players:
            if self.wins_percent - 5 <= player.wins_percent <= self.wins_percent + 5:
                players_id.append([player.id, player.wins_percent])
        players_id.sort(key=lambda x: x[1], reverse=True)
        players_id = [id[0] for id in players_id]
        players = User.objects.filter(id__in=players_id)
        count = 10 if players.count() >= 10 else players.count()
        return players[:count]

    @property
    def ranking_place(self):
        players = []
        for player in User.objects.all():
            players.append([player.id, player.rank])
        players.sort(key=lambda x: x[1], reverse=True)
        place = players.index([self.id, self.rank]) + 1
        return place

    @property
    def warning_notices(self):
        return self.user_notices.filter(notice__notice_type__in=(Notice.Type.WARNING, Notice.Type.CRITICAL), show=True)

    @property
    def showing_notices(self):
        return self.user_notices.filter(show=True).count()

    def rank_before_event(self, event):
        time_rank = datetime.datetime.combine(event.date, event.time_end or event.time_begin)
        if self.ranks_history.filter(event=event).exists():
            time_rank = self.ranks_history.filter(event=event).last().create
        last_rank = self.ranks_history.filter(create__lt=time_rank).last()
        return round(last_rank.rank, 2)

    def rank_before_game(self, game):
        time_rank = datetime.datetime.combine(game.event.date, game.event.time_end or game.event.time_begin)
        if self.ranks_history.filter(event=game.event).exists():
            rank_histories = self.ranks_history.filter(event=game.event)
            if rank_histories.count() == 1:
                time_rank = rank_histories.first().create
            else:
                time_rank = rank_histories[game.number - 1].create
        last_rank = self.ranks_history.filter(create__lt=time_rank).last()
        return round(last_rank.rank, 2)

    @property
    def acronym_positions(self):
        positions = [position.acronym for position in (self.position_1, self.position_2) if position]
        return "/".join(positions)

    @property
    def acronym_position(self):
        acronym = ""
        if self.position_1:
            acronym = self.position_1.acronym
        if self.position_2:
            acronym = self.position_2.acronym
        return acronym


class RankHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="ranks_history")
    rank = models.FloatField(_("Rank"), default=5)
    create = models.DateTimeField(_("Time Create"), default=timezone.now)
    event = models.ForeignKey("events.Event", on_delete=models.CASCADE, related_name="ranks_history", blank=True, null=True)
    update = models.DateTimeField(_("Time Update"), auto_now=True)
    reason = models.CharField(_("Reason Of Creation Rank"), max_length=50, choices=UserEventAction.Actions.choices, default=None, blank=True, null=True)

    class Meta:
        ordering = ["create",]
        verbose_name = "Rank History"
        verbose_name_plural = "Ranks History"

    def __str__(self):
        return f"{self.user.email}" or f"{self.user.username}"


class UserRivals(models.Model):
    from_user = models.ForeignKey("users.User", on_delete=models.CASCADE, related_name="user_rivals_from_user")
    to_user = models.ForeignKey("users.User", on_delete=models.CASCADE, related_name="user_rivals_to_user")
    event = models.ForeignKey("events.Event", on_delete=models.CASCADE, related_name="user_rivals")

    class Meta:
        verbose_name = "User Rivals"
        verbose_name_plural = "User Rivals"

    def __str__(self):
        return f"{self.from_user.__str__()} - {self.to_user.__str__()}"
