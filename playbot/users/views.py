from django.views.generic import TemplateView
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from playbot.users.models import User
from playbot.users.serializers import LoginSerializer, LoginTelegramSerializer, SignUpSerializer, \
    SignUpTelegramSerializer, RefreshPasswordSerializer, UpdateCitySerializer, UserSerializer


class IndexView(APIView):
    permission_classes = (AllowAny,)
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'index.html'

    def get(self, request):
        return Response({})


class ConfirmSignUpView(APIView):
    permission_classes = (AllowAny,)
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'index.html'

    def get(self, request, slug):
        users = User.objects.filter(confirm_slug=slug)
        if users.exists():
            user = users.first()
            user.is_active = True
            user.save()
        return Response({"data": "success!"}, status=status.HTTP_200_OK)


class ServiceWorkerView(TemplateView):
    template_name = 'sw.js'
    content_type = 'application/javascript'
    name = 'sw.js'


class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class LoginTelegramView(TokenObtainPairView):
    serializer_class = LoginTelegramSerializer
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class SignUpView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, format='json'):
        serializer = SignUpSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.validated_data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SignUpTelegramView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, format='json'):
        serializer = SignUpTelegramSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.validated_data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RefreshPasswordView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, format='json'):
        serializer = RefreshPasswordSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.update()
            if user:
                json = serializer.validated_data
                return Response(json, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RefreshViewSet(GenericAPIView):
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class UpdateCityView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format='json'):
        serializer = UpdateCitySerializer(instance=request.user, data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = UserSerializer(instance=request.user).data
                return Response(json, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DataView(APIView):
    permission_classes = (IsAuthenticated,)
    # authentication_classes = [JWTAuthentication,]

    def get(self, request, format='json'):

        return Response({"data": "success!"}, status=status.HTTP_200_OK)


class ValidView(APIView):
    permission_classes = (AllowAny,)
    # authentication_classes = [JWTAuthentication,]

    def get(self, request, format='json'):
        if request.user.is_authenticated:
            authenticated = True
        else:
            authenticated = False

        return Response({"authenticated": authenticated}, status=status.HTTP_200_OK)


class IsAuthView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, format='json'):
        serializer = UserSerializer(instance=request.user)
        json = serializer.data
        return Response(json, status=status.HTTP_200_OK)





