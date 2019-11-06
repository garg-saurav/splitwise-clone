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


def signup_view(request):
    if request.method=='POST':
        data_received=json.loads(request.body.decode('utf-8'))
        return HttpResponse(data_received)
    else:
        return HttpResponse('It was a get request')

class login_view(APIView):
  def post(self,request, format=None):
    users = UserProfile.objects.all()
    print(request.data)
    with connection.cursor() as c:
      c.execute("select password from UserProfile where name = %s",[request.data['userid']])
      res=c.fetchone()
    print(res)
    serializer = userserializer(users, many=True)
    return JsonResponse(request.data, safe=False)

