import json

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from webpush.forms import SubscriptionForm, WebPushForm
from webpush.views import process_subscription_data

from playbot.notices.models import UserNotice
from playbot.users.serializers import UserSerializer


class HiddeUserNoticeView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format='json'):
        user_notice = UserNotice.objects.get(id=request.data.get("id"))
        if request.user.id == user_notice.user.id:
            user_notice.show = False
            user_notice.save()
            user = UserSerializer(instance=request.user).data
            return Response(user, status=status.HTTP_200_OK)
        return Response({"error": "Permission denied!"}, status=status.HTTP_400_BAD_REQUEST)


class CreateSubscriptionView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format='json'):
        # Parse the  json object from post data. return 400 if the json encoding is wrong
        try:
            post_data = json.loads(request.body.decode('utf-8'))
        except ValueError:
            return Response({"error": "Permission denied!"}, status=status.HTTP_400_BAD_REQUEST)

        # Process the subscription data to mach with the model
        subscription_data = process_subscription_data(post_data)
        subscription_form = SubscriptionForm(subscription_data)
        # pass the data through WebPushForm for validation purpose
        web_push_form = WebPushForm(post_data)

        # Check if subscriptioninfo and the web push info bot are valid
        if subscription_form.is_valid() and web_push_form.is_valid():
            # Get the cleaned data in order to get status_type and group_name
            web_push_data = web_push_form.cleaned_data
            status_type = web_push_data.pop("status_type")
            group_name = web_push_data.pop("group")

            # We at least need the user or group to subscribe for a notification
            if request.user.is_authenticated or group_name:
                # Save the subscription info with subscription data
                # as the subscription data is a dictionary and its valid
                subscription = subscription_form.get_or_save()
                web_push_form.save_or_delete(
                    subscription=subscription, user=request.user,
                    status_type=status_type, group_name=group_name)

                # If subscribe is made, means object is created. So return 201
                if status_type == 'subscribe':
                    return Response({"response": "Subscription is created!"}, status=status.HTTP_201_CREATED)
                # Unsubscribe is made, means object is deleted. So return 202
                elif "unsubscribe":
                    return Response({"response": "Subscription is deleted!"}, status=status.HTTP_202_ACCEPTED)

        return Response({"error": "Permission denied!"}, status=status.HTTP_400_BAD_REQUEST)
