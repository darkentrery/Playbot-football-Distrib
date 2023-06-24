import datetime

from loguru import logger

from playbot.events.models import Event, Team, EventGame
from playbot.events.utils import RankCalculation
from playbot.users.models import RankHistory


def team_recalculate(team: Team, event: Event, game: EventGame) -> None:
    for player in team.team_players.all():
        event_player = event.event_player.get(player_id=player.player.id)
        rank = RankCalculation(player.player, event, game=game).get_next_rank_after_game()
        rank_histories = RankHistory.objects.filter(user=player.player, event=game.event)
        if event_player.played == rank_histories.count() and rank_histories.count():
            if event_player.played - 1 == RankHistory.objects.filter(user=player.player, event=game.event).count():
                rank += 0.01
            history_time = datetime.datetime.utcnow() - datetime.timedelta(minutes=5)
            rank_history = RankHistory.objects.filter(user=player.player, event=event, update__lt=history_time).first()
            rank_history.rank = rank
            rank_history.save()
        elif event_player.played != rank_histories.count() and rank_histories.count() == 1:
            rank_history = rank_histories.first()
            rank_history.rank = rank
            rank_history.save()


@logger.catch
def recalculate() -> None:
    for event in Event.objects.filter(time_end__isnull=False):
    # for event in Event.objects.filter(date__gte="2023-06-22"):
        for game in event.event_games.all():
            team_recalculate(game.team_1, event, game)
            team_recalculate(game.team_2, event, game)
