# Generated by Django 3.0.2 on 2020-03-09 13:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bigleague', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Playergeneration',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('suit', models.CharField(max_length=10)),
                ('age', models.IntegerField()),
                ('pv', models.FloatField()),
                ('epv', models.FloatField()),
                ('contract', models.IntegerField()),
                ('t_option', models.IntegerField()),
                ('p_option', models.IntegerField()),
                ('renew', models.CharField(max_length=10)),
                ('salary', models.FloatField()),
                ('grade', models.FloatField()),
                ('team', models.CharField(max_length=25)),
            ],
        ),
    ]