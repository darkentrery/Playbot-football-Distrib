# Generated by Django 4.1.2 on 2023-05-24 16:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0029_user_rivals'),
    ]

    operations = [
        migrations.AddField(
            model_name='rankhistory',
            name='update',
            field=models.DateTimeField(auto_now=True, verbose_name='Time Update'),
        ),
    ]
