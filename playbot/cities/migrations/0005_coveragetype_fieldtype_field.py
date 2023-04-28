# Generated by Django 4.1.2 on 2023-04-28 05:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0031_alter_event_options_alter_eventplayer_options'),
        ('cities', '0004_address_lat_address_lng'),
    ]

    operations = [
        migrations.CreateModel(
            name='CoverageType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150, verbose_name='Coverage Type')),
            ],
            options={
                'verbose_name': 'Coverage Type',
                'verbose_name_plural': 'Coverage Types',
            },
        ),
        migrations.CreateModel(
            name='FieldType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150, verbose_name='Field Type')),
            ],
            options={
                'verbose_name': 'Field Type',
                'verbose_name_plural': 'Field Types',
            },
        ),
        migrations.CreateModel(
            name='Field',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Name')),
                ('shower_room', models.BooleanField(default=False, verbose_name='Shower Room')),
                ('dressing_room', models.BooleanField(default=False, verbose_name='Dressing Room')),
                ('lighting', models.BooleanField(default=False, verbose_name='Lighting')),
                ('tribune', models.BooleanField(default=False, verbose_name='Tribunes')),
                ('address', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='fields', to='cities.address')),
                ('coverage', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='fields', to='cities.coveragetype')),
                ('format', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='fields', to='events.format')),
                ('type_field', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='fields', to='cities.fieldtype')),
            ],
            options={
                'verbose_name': 'Field',
                'verbose_name_plural': 'Fields',
            },
        ),
    ]
