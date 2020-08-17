# Generated by Django 3.0.2 on 2020-08-16 15:53

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('bigleague', '0003_auto_20200816_0124'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='season',
            name='actions',
        ),
        migrations.AddField(
            model_name='action',
            name='number_of_actions',
            field=models.IntegerField(default=2, validators=[django.core.validators.MaxValueValidator(5), django.core.validators.MinValueValidator(0)]),
        ),
        migrations.AlterField(
            model_name='roster',
            name='coach',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='bigleague.Coach'),
        ),
        migrations.AlterField(
            model_name='roster',
            name='gm',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='bigleague.GM'),
        ),
        migrations.AlterField(
            model_name='roster',
            name='player',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='bigleague.Player'),
        ),
    ]
