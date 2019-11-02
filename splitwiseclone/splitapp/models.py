# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.core.validators import int_list_validator


class UserProfiles(models.Model):
    user_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30)
    profile_pic = models.CharField(max_length=100)
    password = models.CharField(max_length=30)
    groups = models.CharField(validators=[int_list_validator], max_length=1000)
    friends = models.CharField(validators=[int_list_validator], max_length=1000)


class Groups(models.Model):
    group_id = models.AutoField(primary_key=True)
    group_name = models.CharField(max_length=30)
    users = models.CharField(validators=[int_list_validator],max_length=1000)


class Transactions(models.Model):
    transaction_id = models.AutoField(primary_key=True)
    lender = models.IntegerField()
    borrower = models.IntegerField()
    group_id = models.IntegerField()
    amount = models.IntegerField()
    date_time =models.DateTimeField(auto_now_add=True)

