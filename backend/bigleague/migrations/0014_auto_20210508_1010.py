# Generated by Django 3.0.2 on 2021-05-08 15:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('bigleague', '0013_auto_20210508_0959'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stadium',
            name='franchise',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bigleague.Franchise', unique=True),
        ),
    ]
