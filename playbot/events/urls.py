from django.urls import path

from playbot.events import views


urlpatterns = [
    path("create/", views.CreateEventView.as_view(), name='create-event'),
    path("get-events/", views.EventsView.as_view(), name='events'),
    path("get-events/<city>/", views.EventsCityView.as_view(), name='events-city'),
    path("get-event/<int:id>/", views.EventView.as_view(), name='event'),
    path("edit/", views.EditEventView.as_view(), name='edit-event'),
    path("cancel-event/", views.CancelEventView.as_view(), name='cancel-event'),
    path("get-cancel-reasons/", views.CancelReasonsView.as_view(), name='cancel-reasons'),
    path("to-confirm-players/", views.ToConfirmPlayersView.as_view(), name='to-confirm-players'),
    path("confirm-players/", views.ConfirmPlayersView.as_view(), name='confirm-players'),
    path("get-regulation/<int:id>/", views.GetRegulationView.as_view(), name='get-regulation'),
    path("set-regulation/", views.SetRegulationView.as_view(), name='set-regulation'),
    path("confirm-team-players/", views.ConfirmTeamPlayersView.as_view(), name='confirm-team-players'),
    path("confirm-teams/", views.ConfirmTeamsView.as_view(), name='confirm-teams'),
    path("join-player/", views.JoinPlayerView.as_view(), name='join-player'),
    path("leave-event/", views.LeaveEventView.as_view(), name='leave-event'),
    path("admin-join-player/", views.AdminJoinPlayerView.as_view(), name='admin-join-player'),
    path("admin-leave-event/", views.AdminLeaveEventView.as_view(), name='admin-leave-event'),
    path("begin-event-game/", views.BeginEventGameView.as_view(), name='begin-event-game'),
    path("end-event/", views.EndEventView.as_view(), name='end-event'),
    path("begin-game-period/", views.BeginGamePeriodView.as_view(), name='begin-game-period'),
    path("end-game-period/", views.EndGamePeriodView.as_view(), name='end-game-period'),
    path("end-game/", views.EndGameView.as_view(), name='end-game'),
    path("create-goal/", views.CreateGoalView.as_view(), name='create-goal'),
    path("update-goal/", views.UpdateGoalView.as_view(), name='update-goal'),
    path("delete-goal/", views.DeleteGoalView.as_view(), name='delete-goal'),
    path("add-to-favorites/", views.AddToFavoritesView.as_view(), name='add-to-favorites'),
    path("remove-from-favorites/", views.RemoveFromFavoritesView.as_view(), name='remove-from-favorites'),
    path("get-colors/", views.ColorsView.as_view(), name='get-colors'),
    path("get-numbers/", views.NumbersView.as_view(), name='get-numbers'),
]
