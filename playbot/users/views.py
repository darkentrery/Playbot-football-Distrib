import copy

from django.views.generic import TemplateView
from loguru import logger
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework_simplejwt.views import TokenObtainPairView

from playbot.cities.models import Address
from playbot.users.models import User, RankHistory
from playbot.users.serializers import LoginSerializer, LoginTelegramSerializer, SignUpSerializer, \
    RefreshPasswordSerializer, UserSerializer, UpdateUserSerializer, \
    UpdatePasswordSerializer, UserListSerializer, UserIsAuthSerializer, LoginAppleSerializer, SignUpAppleSerializer


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
        logger.info(request.data)
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class LoginTelegramView(LoginView):
    serializer_class = LoginTelegramSerializer


class SignUpView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, format='json'):
        # address = CreateAddressSerializer(data=request.data.get("address"))
        # if address.is_valid():
        #     address = address.save()
        # else:
        #     address = Address.objects.all().first()
        # request.data["address"] = address.id
        serializer = SignUpSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                RankHistory.objects.create(user=user)
                json = UserIsAuthSerializer(instance=user).data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SignUpAppleView(LoginView):
    serializer_class = SignUpAppleSerializer


class LoginAppleView(LoginView):
    serializer_class = LoginAppleSerializer


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


class UpdateAddressView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format='json'):
        address = Address.objects.filter(city__name=request.data.get("city")).first()
        request.user.address = address
        request.user.save()
        json = UserIsAuthSerializer(instance=request.user).data
        return Response(json, status=status.HTTP_200_OK)


class IsAuthView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format='json'):
        # webpush_settings = getattr(settings, 'WEBPUSH_SETTINGS', {})
        # vapid_key = webpush_settings.get('VAPID_PUBLIC_KEY')
        json = UserIsAuthSerializer(instance=request.user).data
        # json["vapid_key"] = vapid_key
        return Response(json, status=status.HTTP_200_OK)


class GetUsersView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, format='json', **kwargs):
        json = UserListSerializer(User.objects.all(), many=True).data
        return Response(json, status=status.HTTP_200_OK)


class GetTop10UsersView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, format='json', **kwargs):
        users = [[user.id, user.rank] for user in User.objects.all()]
        users.sort(key=lambda x: x[1], reverse=True)
        users = [id[0] for id in users]
        count = min(10, len(users))
        json = UserListSerializer(User.objects.filter(id__in=users[:count]), many=True).data
        return Response(json, status=status.HTTP_200_OK)


class GetUserView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, format='json', **kwargs):
        json = UserSerializer(instance=User.objects.get(pk=kwargs.get("pk"))).data
        return Response(json, status=status.HTTP_200_OK)


class UpdateUserView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format='json'):
        id = int(request.data.get("id"))
        if request.user.id == id:
            address = Address.objects.filter(city__name=request.data["address"]).first()
            data = copy.copy(request.data)
            data["address"] = address.id
            serializer = UpdateUserSerializer(instance=request.user, data=data)
            if serializer.is_valid():
                user = serializer.save()
                if user:
                    # if request.data.get("photo"):
                    #     photo = get_face(user.photo.url)
                    #     if photo:
                    #         user.photo.save(str(user.photo).replace("/photos", ""), ContentFile(photo), save=True)
                            # user.save()
                    json = UserSerializer(instance=user).data
                    return Response(json, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdatePasswordView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format='json'):
        id = int(request.data.get("id"))
        if request.user.id == id:
            serializer = UpdatePasswordSerializer(instance=request.user, data=request.data)
            if serializer.is_valid():
                user = serializer.save()
                if user:
                    json = UserSerializer(instance=request.user).data
                    return Response(json, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AddToFavoritesView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format='json'):
        user = User.objects.get(id=request.data["id"])
        if not request.user.favorite_players.filter(id=user.id).exists():
            request.user.favorite_players.add(user)
            json = UserSerializer(instance=request.user).data
            return Response(json, status=status.HTTP_200_OK)
        return Response({"error": "Already in favorites!"}, status=status.HTTP_400_BAD_REQUEST)


class RemoveFromFavoritesView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format='json'):
        user = User.objects.get(id=request.data["id"])
        if request.user.favorite_players.filter(id=user.id).exists():
            request.user.favorite_players.remove(user)
            json = UserSerializer(instance=request.user).data
            return Response(json, status=status.HTTP_200_OK)
        return Response({"error": "Not in favorites!"}, status=status.HTTP_400_BAD_REQUEST)


class DeleteUserView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format='json'):
        user = User.objects.get(id=request.data["id"])
        user.delete()
        return Response({}, status=status.HTTP_200_OK)
