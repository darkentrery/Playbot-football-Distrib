from rest_framework import serializers

from playbot.chats.models import Chat, Message
from playbot.users.models import User
from playbot.users.serializers import UserSerializer


class MessageSerializer(serializers.ModelSerializer):
    from_user = UserSerializer(read_only=True)

    class Meta:
        model = Message
        fields = "__all__"


class ChatSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(Message.objects.all(), many=True, read_only=True)
    online = UserSerializer(User.objects.all(), many=True, read_only=True)

    class Meta:
        model = Chat
        fields = "__all__"