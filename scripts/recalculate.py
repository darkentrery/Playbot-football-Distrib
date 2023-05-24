from playbot.events.models import Event
from playbot.events.utils import RankCalculation
from playbot.users.models import RankHistory


def recalculate():
    for event in Event.objects.filter(time_end__isnull=False):
    # for event in Event.objects.filter(date__gte="2023-04-13"):
        for player in event.event_player.all():
            rank = RankCalculation(player.player, event).get_next_rank(recalculate=True)
            RankHistory.objects.update_or_create(
                user=player.player,
                event=event,
                defaults={"rank": rank}
            )
