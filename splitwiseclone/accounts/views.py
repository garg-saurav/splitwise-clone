# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import json
from django.http import HttpResponse, JsonResponse
# from django.contrib.auth.forms import UserCreationForm
from django.http import StreamingHttpResponse
from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import userserializer
from splitapp.models import UserProfile
from django.db import connection

class login_view(APIView):
  def post(self,request, format=None):
    users = UserProfile.objects.all()
    # print(request.data)
    with connection.cursor() as c:
      c.execute("select password from UserProfile where user_name = %s",[request.data['userid']])
      res=c.fetchone()
    if(res[0]==request.data['password']):
      return JsonResponse("Verified", safe=False)
    else:
      return JsonResponse("Failed", safe=False)

class signup_view(APIView):
  def post(self,request, format=None):
    users = UserProfile.objects.all()
    print("Asdas")
    print(request.data)
    with connection.cursor() as c:
      c.execute("select * from UserProfile where user_name = %s",[request.data['userid']]);
      if(len(c.fetchall())!=0):
        return JsonResponse("Username Already Exists", safe=False)
      else:
        c.execute("insert into UserProfile (user_name, name, password) values(%s,%s,%s)",(request.data['userid'],request.data['name'],request.data['password']))
        return JsonResponse("Successfully added", safe=False)
