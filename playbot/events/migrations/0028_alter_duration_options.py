# Generated by Django 4.1.2 on 2023-01-17 13:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0027_alter_goal_player'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='duration',
            options={'ordering': ['duration'], 'verbose_name': 'Duration', 'verbose_name_plural': 'Durations'},
        ),
    ]
