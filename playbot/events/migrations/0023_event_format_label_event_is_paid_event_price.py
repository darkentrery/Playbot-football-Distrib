# Generated by Django 4.1.2 on 2022-12-26 08:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0022_eventqueue'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='format_label',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='event_labels', to='events.format'),
        ),
        migrations.AddField(
            model_name='event',
            name='is_paid',
            field=models.BooleanField(default=False, verbose_name='Is Paid'),
        ),
        migrations.AddField(
            model_name='event',
            name='price',
            field=models.FloatField(default=0, verbose_name='Price'),
        ),
    ]
