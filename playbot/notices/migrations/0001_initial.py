# Generated by Django 4.1.2 on 2023-01-20 14:05

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('events', '0028_alter_duration_options'),
    ]

    operations = [
        migrations.CreateModel(
            name='Notice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('notice_type', models.CharField(choices=[('Warning', 'Warning'), ('Critical', 'Critical'), ('New Player', 'New Player'), ('Invite', 'Invite'), ('Complete Players', 'Complete Players'), ('Cancel Event', 'Cancel Event'), ('Join', 'Join'), ('Regard', 'Regard')], default='Warning', max_length=150, verbose_name='Notice Type')),
                ('text', models.TextField(verbose_name='Notice Text')),
                ('for_all', models.BooleanField(default=False, verbose_name='For All Users')),
                ('create', models.DateTimeField(default=django.utils.timezone.now, verbose_name='Time Create')),
                ('event', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='notices', to='events.event')),
            ],
            options={
                'verbose_name': 'Notice',
                'verbose_name_plural': 'Notices',
            },
        ),
        migrations.CreateModel(
            name='UserNotice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time_read', models.DateTimeField(blank=True, null=True, verbose_name='Time Read')),
                ('notice', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='user_notices', to='notices.notice')),
                ('user', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='user_notices', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'User Notice',
                'verbose_name_plural': 'User Notices',
            },
        ),
    ]
