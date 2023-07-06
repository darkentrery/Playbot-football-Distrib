import copy

from django.conf import settings
from django.core.files.images import ImageFile
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
from playbot.telegram.utils import send_photo_for_moderation
from playbot.users.models import User, RankHistory, PhotoError
from playbot.users.serializers import LoginSerializer, LoginTelegramSerializer, SignUpSerializer, \
    RefreshPasswordSerializer, UserSerializer, UpdateUserSerializer, \
    UpdatePasswordSerializer, UserListSerializer, UserIsAuthSerializer, LoginAppleSerializer, SignUpAppleSerializer, \
    UpdatePhotoUsernameSerializer, LoginTelegramAppSerializer, UpdatePhotoSerializer, PhotoErrorSerializer, \
    UpdateUserPhotoErrorsSerializer, FirstLoginSerializer
from playbot.users.tasks import send_photo_to_moderation_task
from playbot.users.utils import parse_init_data, save_upload_photo


class IndexView(APIView):
    permission_classes = (AllowAny,)
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'index.html'

    def get(self, request, **kwargs):
        return Response({})

    def post(self, request, *args, **kwargs):
        logger.info(request.data)
        return Response({}, status=status.HTTP_200_OK)


class ConfirmSignUpView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = FirstLoginSerializer

    def post(self, request, *args, **kwargs):
        users = User.objects.filter(confirm_slug=kwargs.get("slug"))
        if users.exists():
            user = users.first()
            user.is_active = True
            user.save()
            login_serializer = self.get_serializer(data={"slug": kwargs.get("slug")})
            try:
                login_serializer.is_valid(raise_exception=True)
                json = login_serializer.validated_data
            except TokenError as e:
                raise InvalidToken(e.args[0])

            return Response(json, status=status.HTTP_200_OK)
        return Response({"error": "Permission denied!"}, status=status.HTTP_400_BAD_REQUEST)


class ServiceWorkerView(TemplateView):
    template_name = 'sw.js'
    content_type = 'application/javascript'
    name = 'sw.js'


class AssetLinksView(TemplateView):
    template_name = 'assetlinks.json'
    name = 'assetlinks.json'


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


class LoginTelegramView(LoginView):
    serializer_class = LoginTelegramSerializer


class LoginTelegramAppView(LoginView):
    serializer_class = LoginTelegramAppSerializer

    def post(self, request, *args, **kwargs):
        data = parse_init_data(request.data)
        serializer = self.get_serializer(data=data)
        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return Response(serializer.validated_data, status=status.HTTP_200_OK)


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


class FirstLoginView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format='json'):
        # login_serializer = FirstLoginSerializer(data={"email": use})
        user = request.user
        user.first_login = False
        user.save()
        json = UserIsAuthSerializer(instance=user).data
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


class UpdatePhotoUsernameView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format='json'):
        id = int(request.data.get("id"))
        if request.user.id == id:
            serializer = UpdatePhotoUsernameSerializer(instance=request.user, data=request.data)
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


class CheckUserPhotoView(APIView):
    permission_classes = (IsAuthenticated,)

    @logger.catch
    def post(self, request, format='json'):
        try:
            user = User.objects.get(id=request.data["id"])
            if request.user.id == user.id or request.user.is_organizer:
                user.photo_errors.clear()
                user = save_upload_photo(request.data["upload_photo"], user)
                output_photo = ""
                errors = [{"name": "Local environ!"}]
                # send_photo_for_moderation(user)
                if settings.UNIX_OS:
                    from playbot.users.avatar_service import check_photo
                    errors, photos = check_photo(user)
                    if len(photos):
                        user.photo = ImageFile(photos[0], name=f"{user.id}-original_photo.png")
                        user.big_card_photo = ImageFile(photos[1], name=f"{user.id}-big_card_photo.png")
                        user.small_card_photo = ImageFile(photos[2], name=f"{user.id}-small_card_photo.png")
                        user.overlay_photo = ImageFile(photos[3], name=f"{user.id}-overlay_photo.png")
                        user.save()
                        output_photo = user.big_card_photo.url

                    errors = PhotoErrorSerializer(PhotoError.objects.filter(name__in=errors), many=True).data

                return Response({"photo": output_photo, "errors": errors}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(e, status=status.HTTP_400_BAD_REQUEST)


class ConfirmUserPhotoView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format='json'):
        user = User.objects.get(id=request.data["id"])
        if request.user.id == user.id or request.user.is_organizer:
            if request.data["is_admin_load"]:
                user.is_accept_photo = True
                user.save()
            else:
                send_photo_to_moderation_task.apply_async(args=[user.id], countdown=3)
                # send_photo_for_moderation(user)
            return Response({}, status=status.HTTP_200_OK)
        return Response({"error": "Permissions denied!"}, status=status.HTTP_400_BAD_REQUEST)


class CancelUserPhotoView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format='json'):
        user = request.user
        user.photo = None
        user.big_card_photo = None
        user.small_card_photo = None
        user.overlay_photo = None
        user.is_accept_photo = False
        user.save()
        user.photo_errors.clear()
        return Response({}, status=status.HTTP_200_OK)


class AcceptUserPhotoView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format='json'):
        try:
            user = User.objects.get(id=request.data["id"])
            if request.user.id == user.id or request.user.is_organizer:
                user.is_accept_photo = True
                user.save()
                return Response({}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": "Permissions denied!"}, status=status.HTTP_400_BAD_REQUEST)


class RejectUserPhotoView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format='json'):
        try:
            user = User.objects.get(id=request.data["id"])
            if request.user.id == user.id or request.user.is_organizer:
                serializer = UpdateUserPhotoErrorsSerializer(instance=user, data=request.data)
                if serializer.is_valid():
                    user = serializer.save()
                    json = UserIsAuthSerializer(instance=user).data
                    return Response(json, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": "Permissions denied!"}, status=status.HTTP_400_BAD_REQUEST)


class GetPhotoErrorsView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, format='json', **kwargs):
        json = PhotoErrorSerializer(instance=PhotoError.objects.all(), many=True).data
        return Response(json, status=status.HTTP_200_OK)


class CatchErrorView(APIView):
    def post(self, request, *args, **kwargs):
        logger.info(request.data)
        return Response({}, status=status.HTTP_200_OK)

    def get(self, request, format='json', **kwargs):
        logger.info(request.data)
        return Response({}, status=status.HTTP_200_OK)
