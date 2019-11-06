# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import json
from django.http import HttpResponse
# from django.contrib.auth.forms import UserCreationForm
from django.http import StreamingHttpResponse
from django.shortcuts import render


def signup_view(request):
    if request.method=='POST':
        data_received=json.loads(request.body.decode('utf-8'))
        return HttpResponse(data_received)
    else:
        return HttpResponse('It was a get request')


def login_view(request):
    if request.method == 'GET':
        data_received = json.loads(request.body.decode('utf-8'))
        return HttpResponse(data_received)
