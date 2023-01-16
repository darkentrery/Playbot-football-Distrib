from django.views.generic import TemplateView
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework_simplejwt.views import TokenObtainPairView

from playbot.cities.models import City
from playbot.users.models import User
from playbot.users.serializers import LoginSerializer, LoginTelegramSerializer, SignUpSerializer, \
    SignUpTelegramSerializer, RefreshPasswordSerializer, UpdateCitySerializer, UserSerializer


class IndexView(APIView):
    permission_classes = (AllowAny,)
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'index.html'

    def get(self, request, **kwargs):
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
        City.objects.update_or_create(name=request.data["city"])
        serializer = SignUpSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = UserSerializer(instance=user).data
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


class IsAuthView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, format='json'):
        serializer = UserSerializer(instance=request.user)
        json = serializer.data
        return Response(json, status=status.HTTP_200_OK)


class GetUsersView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, format='json', **kwargs):
        serializer = UserSerializer(User.objects.all(), many=True)
        json = serializer.data
        return Response(json, status=status.HTTP_200_OK)


class GetUserView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, format='json', **kwargs):
        serializer = UserSerializer(instance=User.objects.get(pk=kwargs.get("pk")))
        json = serializer.data
        return Response(json, status=status.HTTP_200_OK)





