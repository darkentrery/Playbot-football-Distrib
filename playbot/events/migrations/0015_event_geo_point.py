# Generated by Django 4.1.2 on 2022-12-09 00:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0014_alter_eventstep_options'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='geo_point',
            field=models.CharField(blank=True, max_length=50, null=True, verbose_name='Geo Point'),
        ),
    ]
