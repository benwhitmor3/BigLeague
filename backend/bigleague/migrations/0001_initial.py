# Generated by Django 3.0.2 on 2020-08-17 16:54

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('email', models.EmailField(max_length=60, unique=True, verbose_name='email')),
                ('username', models.CharField(max_length=30, unique=True)),
                ('date_joined', models.DateTimeField(auto_now_add=True, verbose_name='date joined')),
                ('last_login', models.DateTimeField(auto_now=True, verbose_name='last login')),
                ('is_admin', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='City',
            fields=[
                ('city', models.CharField(max_length=20, primary_key=True, serialize=False)),
                ('city_value', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Coach',
            fields=[
                ('name', models.CharField(max_length=30, primary_key=True, serialize=False)),
                ('attribute_one', models.CharField(blank=True, max_length=20, null=True)),
                ('attribute_two', models.CharField(blank=True, max_length=20, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Franchise',
            fields=[
                ('franchise', models.CharField(max_length=25, primary_key=True, serialize=False)),
                ('username', models.OneToOneField(db_column='username', null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, to_field='username')),
            ],
        ),
        migrations.CreateModel(
            name='GM',
            fields=[
                ('trait', models.CharField(choices=[('facilitator', 'facilitator'), ('promoter', 'promoter'), ('recruiter', 'recruiter'), ('scouter', 'scouter'), ('suitor', 'suitor'), ('trainer', 'trainer')], max_length=20, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Player',
            fields=[
                ('name', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('suit', models.CharField(choices=[('diamond', 'diamond'), ('spade', 'spade'), ('club', 'club'), ('heart', 'heart')], max_length=10)),
                ('age', models.IntegerField(default=20)),
                ('pv', models.FloatField(default=20)),
                ('epv', models.FloatField(default=20)),
                ('s_epv', models.FloatField(default=20)),
                ('contract', models.IntegerField(blank=True, null=True)),
                ('t_option', models.IntegerField(blank=True, null=True)),
                ('p_option', models.IntegerField(blank=True, null=True)),
                ('renew', models.CharField(blank=True, choices=[('no', 'no'), ('non-repeat', 'non-repeat'), ('repeat', 'repeat')], max_length=10)),
                ('salary', models.FloatField(blank=True, null=True)),
                ('grade', models.FloatField(blank=True, null=True)),
                ('lineup', models.CharField(blank=True, choices=[('starter', 'starter'), ('rotation', 'rotation'), ('bench', 'bench')], max_length=10, null=True)),
                ('trainer', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Action',
            fields=[
                ('franchise', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='bigleague.Franchise')),
                ('number_of_actions', models.IntegerField(default=2, validators=[django.core.validators.MaxValueValidator(5), django.core.validators.MinValueValidator(0)])),
                ('improved_bathrooms', models.BooleanField(default=False)),
                ('improved_concessions', models.BooleanField(default=False)),
                ('jumbotron', models.BooleanField(default=False)),
                ('upscale_bar', models.BooleanField(default=False)),
                ('hall_of_fame', models.BooleanField(default=False)),
                ('improved_seating', models.BooleanField(default=False)),
                ('improved_sound', models.BooleanField(default=False)),
                ('party_deck', models.BooleanField(default=False)),
                ('wi_fi', models.BooleanField(default=False)),
                ('fan_night', models.BooleanField(default=False)),
                ('family_game', models.BooleanField(default=False)),
                ('door_prizes', models.BooleanField(default=False)),
                ('mvp_night', models.BooleanField(default=False)),
                ('parade_of_champions', models.BooleanField(default=False)),
                ('bribe_the_refs', models.BooleanField(default=False)),
                ('easy_runs', models.BooleanField(default=False)),
                ('fan_factor', models.BooleanField(default=False)),
                ('train_player', models.IntegerField(default=0, validators=[django.core.validators.MaxValueValidator(5), django.core.validators.MinValueValidator(0)])),
                ('farm_system', models.BooleanField(default=False)),
                ('fan_favourites', models.BooleanField(default=False)),
                ('gourmet_restaurant', models.BooleanField(default=False)),
                ('beer_garden', models.BooleanField(default=False)),
                ('naming_rights', models.BooleanField(default=False)),
                ('event_planning', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Season',
            fields=[
                ('franchise', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='bigleague.Franchise')),
                ('ready', models.BooleanField(default=False)),
                ('wins', models.IntegerField(default=0)),
                ('losses', models.IntegerField(default=0)),
                ('ppg', models.FloatField(default=0)),
                ('std', models.FloatField(default=0)),
                ('championships', models.IntegerField(default=0)),
                ('bonuses', models.IntegerField(default=0)),
                ('penalties', models.IntegerField(default=0)),
                ('fan_base', models.FloatField(default=0)),
                ('fan_index', models.FloatField(default=0)),
                ('advertising', models.IntegerField(default=1)),
                ('revenue', models.FloatField(default=0)),
                ('expenses', models.FloatField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Stadium',
            fields=[
                ('stadium_name', models.CharField(max_length=20, primary_key=True, serialize=False)),
                ('seats', models.IntegerField(default=0)),
                ('boxes', models.IntegerField(default=0)),
                ('grade', models.IntegerField(default=20)),
                ('max_grade', models.IntegerField(default=20)),
                ('home_field_advantage', models.IntegerField(default=0)),
                ('city', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bigleague.City')),
                ('franchise', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='bigleague.Franchise')),
            ],
        ),
        migrations.CreateModel(
            name='League',
            fields=[
                ('league_name', models.CharField(max_length=25, primary_key=True, serialize=False)),
                ('franchise', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='bigleague.Franchise')),
            ],
        ),
        migrations.CreateModel(
            name='Staff',
            fields=[
                ('franchise', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='bigleague.Franchise')),
                ('coach', models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='bigleague.Coach')),
                ('gm', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='bigleague.GM')),
            ],
        ),
        migrations.CreateModel(
            name='Roster',
            fields=[
                ('player', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='bigleague.Player')),
                ('franchise', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bigleague.Franchise')),
            ],
        ),
    ]
