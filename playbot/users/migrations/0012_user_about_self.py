# Generated by Django 4.1.2 on 2023-01-17 14:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0011_position_user_birthday_user_photo_user_position_1_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='about_self',
            field=models.TextField(blank=True, null=True, verbose_name='About Self'),
        ),
    ]