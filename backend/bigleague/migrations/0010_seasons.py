# Generated by Django 3.0.2 on 2020-05-01 00:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('bigleague', '0009_auto_20200430_1903'),
    ]

    operations = [
        migrations.CreateModel(
            name='Seasons',
            fields=[
                ('season', models.IntegerField(primary_key=True, serialize=False)),
                ('wins', models.IntegerField()),
                ('losses', models.IntegerField()),
                ('ppg', models.FloatField()),
                ('std', models.FloatField()),
                ('team', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bigleague.Teams')),
            ],
        ),
    ]