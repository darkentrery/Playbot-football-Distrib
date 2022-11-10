# Generated by Django 4.1.2 on 2022-11-08 16:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0002_event_notice'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='format',
            field=models.CharField(blank=True, choices=[('5x5', '5x5'), ('6x6', '6x6'), ('7x7', '7x7'), ('8x8', '8x8'), ('9x9', '9x9'), ('10x10', '10x10'), ('11x11', '11x11')], default='5x5', max_length=50, null=True, verbose_name='Format'),
        ),
        migrations.AlterField(
            model_name='event',
            name='notice',
            field=models.TextField(blank=True, null=True, verbose_name='Notice'),
        ),
        migrations.AlterField(
            model_name='event',
            name='time_end',
            field=models.TimeField(blank=True, null=True, verbose_name='Time End'),
        ),
    ]
