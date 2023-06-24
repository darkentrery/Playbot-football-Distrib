# Generated by Django 4.1.2 on 2023-06-24 10:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0033_photoerror_user_is_accept_photo_user_photo_errors'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='big_card_photo',
            field=models.ImageField(blank=True, null=True, upload_to='photos', verbose_name='Photo'),
        ),
        migrations.AddField(
            model_name='user',
            name='overlay_photo',
            field=models.ImageField(blank=True, null=True, upload_to='photos', verbose_name='Photo'),
        ),
        migrations.AddField(
            model_name='user',
            name='small_card_photo',
            field=models.ImageField(blank=True, null=True, upload_to='photos', verbose_name='Photo'),
        ),
    ]
