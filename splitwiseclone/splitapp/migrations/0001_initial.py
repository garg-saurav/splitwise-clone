# -*- coding: utf-8 -*-
# Generated by Django 1.11.25 on 2019-11-02 21:16
from __future__ import unicode_literals

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Groups',
            fields=[
                ('group_id', models.AutoField(primary_key=True, serialize=False)),
                ('group_name', models.CharField(max_length=30)),
                ('users', models.CharField(max_length=1000, validators=[django.core.validators.int_list_validator])),
            ],
        ),
        migrations.CreateModel(
            name='Transactions',
            fields=[
                ('transaction_id', models.AutoField(primary_key=True, serialize=False)),
                ('lender', models.IntegerField()),
                ('borrower', models.IntegerField()),
                ('group_id', models.IntegerField()),
                ('amount', models.IntegerField()),
                ('date_time', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='UserProfiles',
            fields=[
                ('user_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=30)),
                ('profile_pic', models.CharField(max_length=100)),
                ('password', models.CharField(max_length=30)),
                ('groups', models.CharField(max_length=1000, validators=[django.core.validators.int_list_validator])),
                ('friends', models.CharField(max_length=1000, validators=[django.core.validators.int_list_validator])),
            ],
        ),
    ]
