from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from playbot.notices.models import UserNotice
from playbot.users.serializers import UserSerializer


class HiddeUserNoticeView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format='json'):
        user_notice = UserNotice.objects.get(id=request.data.get("id"))
        if request.user.id == user_notice.user.id:
            user_notice.show = False
            user_notice.save()
            json = UserSerializer(instance=request.user).data
            return Response(json, status=status.HTTP_200_OK)
        return Response({"error": "Permission denied!"}, status=status.HTTP_400_BAD_REQUEST)


