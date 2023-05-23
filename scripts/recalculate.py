from playbot.events.models import Event
from playbot.events.utils import get_next_rank
from playbot.users.models import RankHistory


def recalculate():
    # for event in Event.objects.all():
    for event in Event.objects.filter(date__gte="2023-04-13"):
        for player in event.event_player.all():
            rank = get_next_rank(player.player, event, recalculate=True)
            # RankHistory.objects.filter(user=player.player, event=event).update(rank=rank)
