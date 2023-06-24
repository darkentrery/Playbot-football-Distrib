# Generated by Django 4.1.2 on 2023-06-17 10:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0032_gender'),
    ]

    operations = [
        migrations.CreateModel(
            name='PhotoError',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250, unique=True, verbose_name='Error Name')),
            ],
            options={
                'verbose_name': 'Photo Error',
                'verbose_name_plural': 'Photo Errors',
            },
        ),
        migrations.AddField(
            model_name='user',
            name='is_accept_photo',
            field=models.BooleanField(default=False, verbose_name='Is Accept Photo'),
        ),
        migrations.AddField(
            model_name='user',
            name='photo_errors',
            field=models.ManyToManyField(blank=True, related_name='users', to='users.photoerror'),
        ),
    ]