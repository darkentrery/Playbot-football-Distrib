from django.urls import path, re_path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from playbot.users import views

urlpatterns = [
    path("", views.IndexView.as_view(), name='index'),
    path("events/", views.IndexView.as_view(), name='index-events'),
    path("events/event/<int>/", views.IndexView.as_view(), name='index-event'),
    path("login/", views.IndexView.as_view(), name='index'),
    path("sign-up/", views.IndexView.as_view(), name='index'),
    re_path(r"^api/login/$", views.LoginView.as_view(), name='login'),
    re_path(r"^api/telegram-login/$", views.LoginTelegramView.as_view(), name='telegram-login'),
    re_path(r"^api/sign-up/$", views.SignUpView.as_view(), name='sign-up'),
    re_path(r"^api/refresh-password/$", views.RefreshPasswordView.as_view(), name='refresh-password'),
    re_path(r"^api/telegram-sign-up/$", views.SignUpTelegramView.as_view(), name='telegram-sign-up'),
    path("api/update-city/", views.UpdateCityView.as_view(), name='update-city'),
    path('api/token/obtain/', TokenObtainPairView.as_view(), name='token_obtain'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("confirm-sign-up/<slug>/", views.ConfirmSignUpView.as_view(), name='confirm-sign-up'),
    path('sw.js', views.ServiceWorkerView.as_view(), name=views.ServiceWorkerView.name),
    path("api/is-auth/", views.IsAuthView.as_view(), name='is-auth'),
    path("api/get-users/", views.GetUsersView.as_view(), name='get-users'),
    path("api/get-user/<int:pk>/", views.GetUserView.as_view(), name='get-user'),
    path("api/update-user/", views.UpdateUserView.as_view(), name='update-user'),
    path("api/update-password/", views.UpdatePasswordView.as_view(), name='update-password'),
    path("add-to-favorites/", views.AddToFavoritesView.as_view(), name='add-to-favorites-player'),
    path("remove-from-favorites/", views.RemoveFromFavoritesView.as_view(), name='remove-from-favorites-player'),
]