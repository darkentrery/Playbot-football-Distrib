# Generated by Django 4.1.2 on 2022-12-23 04:35

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('events', '0021_alter_eventgame_team_1_alter_eventgame_team_2'),
    ]

    operations = [
        migrations.CreateModel(
            name='EventQueue',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.PositiveIntegerField(default=1, verbose_name='Number')),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='event_queues', to='events.event')),
                ('player', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='event_queues', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Event Queue',
                'verbose_name_plural': 'Events Queues',
                'unique_together': {('number', 'event'), ('player', 'event')},
            },
        ),
    ]
