# Generated by Django 4.1.2 on 2023-01-24 14:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0015_remove_user_rank_rankhistory'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='involvement',
            field=models.PositiveIntegerField(default=0, verbose_name='Involvement'),
        ),
        migrations.AddField(
            model_name='user',
            name='penalty',
            field=models.PositiveIntegerField(default=0, verbose_name='Penalty'),
        ),
    ]
