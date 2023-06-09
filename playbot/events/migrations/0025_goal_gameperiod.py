# Generated by Django 4.1.2 on 2022-12-30 14:19

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('events', '0024_event_currency'),
    ]

    operations = [
        migrations.CreateModel(
            name='Goal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.DateTimeField(default=django.utils.timezone.now, verbose_name='Goal Time')),
                ('game_time', models.FloatField(verbose_name='Game Time')),
                ('game', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='goals', to='events.eventgame')),
                ('player', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='goals', to=settings.AUTH_USER_MODEL)),
                ('team', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='goals', to='events.team')),
            ],
            options={
                'verbose_name': 'Goal',
                'verbose_name_plural': 'Goals',
                'ordering': ['time'],
                'unique_together': {('game', 'time')},
            },
        ),
        migrations.CreateModel(
            name='GamePeriod',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time_begin', models.DateTimeField(default=django.utils.timezone.now, verbose_name='Time Begin')),
                ('time_end', models.DateTimeField(blank=True, null=True, verbose_name='Time End')),
                ('game', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='game_periods', to='events.eventgame')),
            ],
            options={
                'verbose_name': 'Game Period',
                'verbose_name_plural': 'Game Periods',
                'ordering': ['time_begin'],
                'unique_together': {('game', 'time_end'), ('game', 'time_begin')},
            },
        ),
    ]
