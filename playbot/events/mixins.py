from playbot.notices.models import UserNotice, Notice


class CreateNotice:
    def notice_not_places_in_event(self, user):
        notice = Notice.objects.create(
            notice_type=Notice.Type.WARNING,
            text="Все места заняты. Вы можете попасть в лист ожидания. Если кто-то не сможет прийти на игру с вами свяжутся.",
            event=self
        )
        UserNotice.objects.create(user=user, notice=notice)

    def notice_cancel_event(self):
        notice = Notice.objects.create(
            notice_type=Notice.Type.CANCEL_EVENT,
            text=f"Игра {self.name} была отменена",
            event=self
        )
        for player in self.event_player.all():
            UserNotice.objects.create(user=player.player, notice=notice)

    def notice_new_player(self):
        notice = Notice.objects.create(
            notice_type=Notice.Type.NEW_PLAYER,
            text=f"В игру {self.name} добавился новый участник",
            event=self
        )
        for player in self.event_player.all():
            UserNotice.objects.create(user=player.player, notice=notice)

    def notice_complete_players(self):
        notice = Notice.objects.create(
            notice_type=Notice.Type.COMPLETE_PLAYERS,
            text=f"Игра  {self.name} набрала {self.count_players} из {self.count_players} участников.",
            event=self
        )
        for player in self.event_player.all():
            UserNotice.objects.create(user=player.player, notice=notice)

    def notice_join_to_event(self, user):
        notice = Notice.objects.create(
            notice_type=Notice.Type.JOIN,
            text=f"Вы успешно присоединились к игре",
            event=self
        )
        UserNotice.objects.create(user=user, notice=notice)
