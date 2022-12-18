from urllib.parse import parse_qs

from channels.db import database_sync_to_async
from django.http import HttpRequest
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework_simplejwt.views import TokenRefreshView


class GetNewAccessToken(TokenRefreshView):

    def get_token(self, refresh_token):
        serializer = self.get_serializer(data={"refresh": refresh_token})

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])
        return serializer.data

    def get_serializer_context(self):
        """
        Extra context provided to the serializer class.
        """
        return {
            'view': self
        }


@database_sync_to_async
def get_user(scope):
    """
    Return the user model instance associated with the given scope.
    If no user is retrieved, return an instance of `AnonymousUser`.
    """
    # postpone model import to avoid ImproperlyConfigured error before Django
    # setup is complete.
    from django.contrib.auth.models import AnonymousUser

    if "token" not in scope:
        raise ValueError(
            "Cannot find token in scope. You should wrap your consumer in "
            "TokenAuthMiddleware."
        )
    user = None
    request = HttpRequest()
    request.META["HTTP_AUTHORIZATION"] = scope["token"]
    try:
        auth = JWTAuthentication()
        user, validate_token = auth.authenticate(request)
    except AuthenticationFailed:
        try:
            new_tokens = GetNewAccessToken().get_token(scope["refresh"])
            request.META["HTTP_AUTHORIZATION"] = f"Bearer {new_tokens['access']}"
            auth = JWTAuthentication()
            user, validate_token = auth.authenticate(request)
            print(new_tokens)
        except AuthenticationFailed:
            pass
    return user or AnonymousUser()


class TokenAuthMiddleware:

    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        query_params = parse_qs(scope["query_string"].decode())
        token = query_params["Authorization"][0]
        scope["token"] = token
        scope["refresh"] = query_params["Refresh"][0]
        scope["user"] = await get_user(scope)
        return await self.app(scope, receive, send)