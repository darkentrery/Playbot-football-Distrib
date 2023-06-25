from django.urls import path


from playbot.telegram import views

urlpatterns = [
    path("get-channels/", views.GetChannelsView.as_view(), name='get-channels'),
    path("get-channels/<int:id>/", views.GetChannelsByAdminView.as_view(), name='get-channels-by-admin'),
    path("update-channel/", views.UpdateChannelView.as_view(), name='update-channel'),
    path("create-channel/", views.CreateChannelView.as_view(), name='create-channel'),
    path("delete-channel/", views.DeleteChannelView.as_view(), name='delete-channel'),
]
