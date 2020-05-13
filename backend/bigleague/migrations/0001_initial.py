# Generated by Django 3.0.2 on 2020-05-13 04:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='City',
            fields=[
                ('city', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('city_value', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Owner',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('team', models.CharField(max_length=100, unique=True)),
                ('username', models.CharField(max_length=100, unique=True)),
                ('owner', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='Owner', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Stadium',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stadium_seats', models.IntegerField(blank=True, null=True)),
                ('stadium_boxes', models.IntegerField(blank=True, null=True)),
                ('stadium_grade', models.IntegerField(blank=True, null=True)),
                ('stadium_max_grade', models.IntegerField(blank=True, null=True)),
                ('team', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bigleague.Owner')),
            ],
        ),
        migrations.CreateModel(
            name='Season',
            fields=[
                ('season', models.IntegerField(primary_key=True, serialize=False)),
                ('wins', models.IntegerField()),
                ('losses', models.IntegerField()),
                ('ppg', models.FloatField()),
                ('std', models.FloatField()),
                ('team', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bigleague.Owner')),
            ],
        ),
        migrations.CreateModel(
            name='Player',
            fields=[
                ('name', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('suit', models.CharField(max_length=10)),
                ('age', models.IntegerField()),
                ('pv', models.FloatField()),
                ('epv', models.FloatField()),
                ('s_epv', models.FloatField()),
                ('contract', models.IntegerField(blank=True, null=True)),
                ('t_option', models.IntegerField(blank=True, null=True)),
                ('p_option', models.IntegerField(blank=True, null=True)),
                ('renew', models.CharField(blank=True, max_length=10)),
                ('salary', models.FloatField(blank=True, null=True)),
                ('grade', models.FloatField(blank=True, null=True)),
                ('team', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bigleague.Owner')),
            ],
        ),
        migrations.CreateModel(
            name='GM',
            fields=[
                ('trait', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('team', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bigleague.Owner')),
            ],
        ),
        migrations.CreateModel(
            name='Coach',
            fields=[
                ('name', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('attribute1', models.CharField(max_length=25)),
                ('attribute2', models.CharField(max_length=25)),
                ('team', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bigleague.Owner')),
            ],
        ),
    ]
