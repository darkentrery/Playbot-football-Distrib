# Generated by Django 4.1.2 on 2023-01-24 08:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notices', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='usernotice',
            name='show',
            field=models.BooleanField(default=True, verbose_name='Show Notice On Window'),
        ),
    ]
