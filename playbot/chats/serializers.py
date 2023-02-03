from rest_framework import serializers

from playbot.chats.models import Chat, Message
from playbot.users.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "photo"]
        read_only_fields = fields


class MessageSerializer(serializers.ModelSerializer):
    from_user = UserSerializer(read_only=True)

    class Meta:
        model = Message
        fields = ["id", "chat", "from_user", "content", "timestamp", "read"]
        read_only_fields = fields


class ChatSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(Message.objects.all(), many=True, read_only=True)
    online = UserSerializer(User.objects.all(), many=True, read_only=True)

    class Meta:
        model = Chat
        fields = ["id", "messages", "online", "event"]
        read_only_fields = fields