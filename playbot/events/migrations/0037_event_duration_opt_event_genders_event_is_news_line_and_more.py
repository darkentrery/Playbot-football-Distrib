# Generated by Django 4.1.2 on 2023-06-13 08:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0032_gender'),
        ('telegram', '0001_initial'),
        ('events', '0036_goal_assistant_goal_auto'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='duration_opt',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='events_opt', to='events.duration'),
        ),
        migrations.AddField(
            model_name='event',
            name='genders',
            field=models.ManyToManyField(blank=True, related_name='event_genders', to='users.gender'),
        ),
        migrations.AddField(
            model_name='event',
            name='is_news_line',
            field=models.BooleanField(default=False, verbose_name='Is Public in News Lina'),
        ),
        migrations.AddField(
            model_name='event',
            name='max_age',
            field=models.PositiveIntegerField(default=0, verbose_name='Max Age'),
        ),
        migrations.AddField(
            model_name='event',
            name='max_players_rank',
            field=models.PositiveIntegerField(default=0, verbose_name='Max Players Rank'),
        ),
        migrations.AddField(
            model_name='event',
            name='min_age',
            field=models.PositiveIntegerField(default=0, verbose_name='Min Age'),
        ),
        migrations.AddField(
            model_name='event',
            name='min_players_rank',
            field=models.PositiveIntegerField(default=0, verbose_name='Min Players Rank'),
        ),
        migrations.AddField(
            model_name='event',
            name='public_in_channel',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='telegram.telegramchannel'),
        ),
        migrations.AddField(
            model_name='event',
            name='publish_time',
            field=models.DateTimeField(blank=True, null=True, verbose_name='Time of Delayed Publishing'),
        ),
    ]