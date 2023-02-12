# Generated by Django 4.1.2 on 2023-02-12 06:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cities', '0004_address_lat_address_lng'),
        ('users', '0020_rankhistory_event'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='city',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='user', to='cities.city'),
        ),
    ]