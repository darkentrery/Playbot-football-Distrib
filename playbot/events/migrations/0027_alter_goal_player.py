# Generated by Django 4.1.2 on 2023-01-07 07:35

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('events', '0026_remove_eventgame_score_1_remove_eventgame_score_2'),
    ]

    operations = [
        migrations.AlterField(
            model_name='goal',
            name='player',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='goals', to=settings.AUTH_USER_MODEL),
        ),
    ]