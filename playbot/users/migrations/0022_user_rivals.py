# Generated by Django 4.1.2 on 2023-03-10 00:49

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0021_alter_user_city'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='rivals',
            field=models.ManyToManyField(blank=True, related_name='in_rivals', to=settings.AUTH_USER_MODEL),
        ),
    ]
