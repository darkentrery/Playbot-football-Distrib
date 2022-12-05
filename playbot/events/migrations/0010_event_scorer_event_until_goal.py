# Generated by Django 4.1.2 on 2022-12-03 01:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0009_countcircles_distributionmethod_duration_format_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='scorer',
            field=models.BooleanField(default=False, verbose_name='Is Scorer of Goal'),
        ),
        migrations.AddField(
            model_name='event',
            name='until_goal',
            field=models.BooleanField(default=False, verbose_name='Play Until Goal'),
        ),
    ]