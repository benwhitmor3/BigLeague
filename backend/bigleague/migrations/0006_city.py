# Generated by Django 3.0.2 on 2020-04-19 18:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bigleague', '0005_playergeneration_grade'),
    ]

    operations = [
        migrations.CreateModel(
            name='City',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('city', models.CharField(max_length=50)),
                ('city_value', models.IntegerField()),
            ],
        ),
    ]
