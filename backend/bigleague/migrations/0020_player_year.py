# Generated by Django 3.0.2 on 2021-08-13 02:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bigleague', '0019_auto_20210511_1736'),
    ]

    operations = [
        migrations.AddField(
            model_name='player',
            name='year',
            field=models.IntegerField(default=1),
        ),
    ]
