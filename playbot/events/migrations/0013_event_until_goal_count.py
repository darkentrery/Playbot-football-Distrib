# Generated by Django 4.1.2 on 2022-12-07 14:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0012_alter_countcircles_name_alter_duration_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='until_goal_count',
            field=models.IntegerField(blank=True, null=True, verbose_name='Count of Goal Until Play'),
        ),
    ]