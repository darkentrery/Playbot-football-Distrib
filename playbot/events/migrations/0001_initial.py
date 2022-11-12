# Generated by Django 4.1.2 on 2022-11-08 14:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CancelReasons',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150, verbose_name='Reason')),
            ],
            options={
                'verbose_name': 'Cancel Reason',
                'verbose_name_plural': 'Cancel Reasons',
            },
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150, verbose_name='Name')),
                ('date', models.DateField(verbose_name='Date Of Game')),
                ('time_begin', models.TimeField(verbose_name='Time Begin')),
                ('time_end', models.TimeField(verbose_name='Time End')),
                ('count_players', models.IntegerField(verbose_name='Count Of Players')),
                ('address', models.CharField(max_length=150, verbose_name='Address')),
                ('cancel', models.BooleanField(default=False, verbose_name='Cancel')),
                ('format', models.CharField(choices=[('5x5', '5x5'), ('6x6', '6x6'), ('7x7', '7x7'), ('8x8', '8x8'), ('9x9', '9x9'), ('10x10', '10x10'), ('11x11', '11x11')], default='5x5', max_length=50, verbose_name='Format')),
                ('cancel_reasons', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='event', to='events.cancelreasons')),
            ],
            options={
                'verbose_name': 'Event',
                'verbose_name_plural': 'Events',
            },
        ),
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150, verbose_name='Name')),
                ('count_players', models.IntegerField(verbose_name='Count Of Players')),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='team', to='events.event')),
            ],
            options={
                'verbose_name': 'Team',
                'verbose_name_plural': 'Teams',
            },
        ),
    ]