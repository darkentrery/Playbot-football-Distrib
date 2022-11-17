# Generated by Django 4.1.2 on 2022-11-17 08:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0007_alter_user_username'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='confirm_slug',
            field=models.CharField(blank=True, max_length=150, verbose_name='Confirm Slug'),
        ),
        migrations.AlterField(
            model_name='user',
            name='is_active',
            field=models.BooleanField(default=False, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active'),
        ),
    ]
