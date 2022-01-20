# Generated by Django 3.1.4 on 2021-01-13 19:51

from django.db import migrations, models
import tutorials.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Tutorial',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(default='', max_length=70)),
                ('description', models.CharField(default='', max_length=200)),
                ('price', models.IntegerField(default=0)),
                ('published', models.BooleanField(default=False)),
                ('upload', models.ImageField(blank=True, null=True, upload_to=tutorials.models.upload_path)),
            ],
        ),
    ]
