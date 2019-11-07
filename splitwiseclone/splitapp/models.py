# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.core.validators import int_list_validator


class UserProfile(models.Model):
    user_name = models.CharField(primary_key=True,max_length=30)
    name = models.CharField(max_length=30)
    profile_pic = models.ImageField(default='default.png', null=True, blank=True)
    password = models.CharField(max_length=30)
    groups = models.CharField(validators=[int_list_validator], max_length=1000, null=True, blank=True)
    friends = models.CharField(validators=[int_list_validator], max_length=1000, null=True, blank=True)

    def __str__(self):
        return self.user_name


    class Meta:
        db_table = 'UserProfile'


class Group(models.Model):
    group_id = models.AutoField(primary_key=True)
    group_name = models.CharField(max_length=30)
    users = models.CharField(validators=[int_list_validator],max_length=1000, blank=True)

    def __str__(self):
        return self.group_name

    class Meta:
        db_table = 'Groups'


class Transaction(models.Model):
    transaction_id = models.AutoField(primary_key=True)
    lender = models.IntegerField()
    borrower = models.IntegerField()
    group_id = models.IntegerField()
    amount = models.IntegerField()
    date_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.date_time)

    class Meta:
        db_table = 'trans'

