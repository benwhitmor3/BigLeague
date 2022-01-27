# Generated by Django 3.0.2 on 2021-04-27 00:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('bigleague', '0004_auto_20210305_1648'),
    ]

    operations = [
        migrations.CreateModel(
            name='Roster',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('lineup', models.CharField(choices=[('bench', 'bench'), ('rotation', 'rotation'), ('starter', 'starter')], max_length=10, null=True)),
                ('franchise', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bigleague.Franchise')),
                ('player', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='bigleague.Player')),
            ],
        ),
    ]