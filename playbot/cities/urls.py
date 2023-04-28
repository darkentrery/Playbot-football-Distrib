from django.urls import path

from playbot.cities import views


urlpatterns = [
    path("get-cities/", views.CitiesView.as_view(), name='get-cities'),
    path("get-addresses/", views.GetAddressesByCityView.as_view(), name='get-addresses'),
    path("get-fields/", views.GetFieldsView.as_view(), name='get-fields'),
]