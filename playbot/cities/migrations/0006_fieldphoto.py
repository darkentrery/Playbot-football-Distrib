# Generated by Django 4.1.2 on 2023-04-28 09:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cities', '0005_coveragetype_fieldtype_field'),
    ]

    operations = [
        migrations.CreateModel(
            name='FieldPhoto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('photo', models.ImageField(upload_to='photo/', verbose_name='Photo')),
                ('field', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='field_photos', to='cities.field')),
            ],
            options={
                'verbose_name': 'Field Photo',
                'verbose_name_plural': 'Field Photos',
            },
        ),
    ]