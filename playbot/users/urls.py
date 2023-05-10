from django.urls import path, re_path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from playbot.users import views

urlpatterns = [
    path("", views.IndexView.as_view(), name='index'),
    re_path(r"^events/", views.IndexView.as_view(), name='index-events'),
    re_path(r"^statistic/", views.IndexView.as_view(), name='index-statistic'),
    re_path(r"^faq/", views.IndexView.as_view(), name='index-faq'),
    re_path(r"^allow-policy/", views.IndexView.as_view(), name='index-allow-policy'),
    re_path(r"^allow-offer/", views.IndexView.as_view(), name='index-allow-offer'),
    re_path(r"^rules/", views.IndexView.as_view(), name='index-rules'),
    re_path(r"^profile/", views.IndexView.as_view(), name='index-profile'),
    re_path(r"^confirm-sign-up/", views.IndexView.as_view(), name='index-sign-up'),
    # path("events/event/<int>/", views.IndexView.as_view(), name='index-event'),
    path("login/", views.IndexView.as_view(), name='index'),
    path("sign-up/", views.IndexView.as_view(), name='index'),
    path("api/login/", views.LoginView.as_view(), name='login'),
    path("api/telegram-login/", views.LoginTelegramView.as_view(), name='telegram-login'),
    path("api/sign-up/", views.SignUpView.as_view(), name='sign-up'),
    path("api/refresh-password/", views.RefreshPasswordView.as_view(), name='refresh-password'),
    path("api/update-address/", views.UpdateAddressView.as_view(), name='update-address'),
    path('api/token/obtain/', TokenObtainPairView.as_view(), name='token_obtain'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("api/confirm-sign-up/<slug>/", views.ConfirmSignUpView.as_view(), name='confirm-sign-up'),
    path('sw.js', views.ServiceWorkerView.as_view(), name=views.ServiceWorkerView.name),
    path("api/is-auth/", views.IsAuthView.as_view(), name='is-auth'),
    path("api/get-users/", views.GetUsersView.as_view(), name='get-users'),
    path("api/get-top-10-users/", views.GetTop10UsersView.as_view(), name='get-top-10-users'),
    path("api/get-user/<int:pk>/", views.GetUserView.as_view(), name='get-user'),
    path("api/update-user/", views.UpdateUserView.as_view(), name='update-user'),
    path("api/update-password/", views.UpdatePasswordView.as_view(), name='update-password'),
    path("api/delete-user/", views.DeleteUserView.as_view(), name='delete-user'),
    path("add-to-favorites/", views.AddToFavoritesView.as_view(), name='add-to-favorites-player'),
    path("remove-from-favorites/", views.RemoveFromFavoritesView.as_view(), name='remove-from-favorites-player'),
    path("api/apple-sign-up/", views.SignUpAppleView.as_view(), name='apple-sign-up'),
    path("api/apple-login/", views.LoginAppleView.as_view(), name='apple-login'),
]