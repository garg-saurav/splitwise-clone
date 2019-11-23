# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.core.validators import int_list_validator


class UserProfile(models.Model):
    user_name = models.CharField(unique=True,max_length=30)
    name = models.CharField(max_length=30)
    profile_pic = models.ImageField(default='default.png', null=True, blank=True)
    password = models.CharField(max_length=30)

    def __str__(self):
        return self.user_name

    class Meta:
        db_table = 'UserProfile'


class UserGroup(models.Model):
  group_id = models.IntegerField()
  user_name = models.CharField(max_length=30)
  group_name = models.CharField(max_length=30)


  def __str__(self):
    return str(self.group_id)+":"+self.user_name+":"+self.group_name

  class Meta:
    db_table = 'UG'

class GroupId(models.Model):
  group_id = models.AutoField(primary_key=True)
  group_name = models.CharField(max_length=30)

  def __str__(self):
    return str(self.group_id)+":"+self.group_name

  class Meta:
    db_table = 'GId'

class UserFriend(models.Model):
  user_name = models.CharField(max_length=30)
  friend_user_name = models.CharField(max_length=30)

  def __str__(self):
    return self.user_name+":"+self.friend_user_name

  class Meta:
    db_table = 'UF'


class Transaction(models.Model):
    transaction_id = models.AutoField(primary_key=True)
    lender = models.CharField(max_length=30)
    borrower = models.CharField(max_length=30)
    group_id = models.IntegerField()
    amount = models.IntegerField()
    date_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.date_time)

    class Meta:
        db_table = 'trans'

