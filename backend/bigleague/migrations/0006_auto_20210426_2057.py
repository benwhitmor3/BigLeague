# Generated by Django 3.0.2 on 2021-04-27 01:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('bigleague', '0005_roster'),
    ]

    operations = [
        migrations.AddField(
            model_name='player',
            name='league',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='bigleague.League'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='player',
            name='franchise',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='bigleague.Franchise'),
        ),
    ]