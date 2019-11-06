from django.http import HttpResponse
from django.http import JsonResponse
from django.core import serializers

from splitapp.models import UserProfile
from django.shortcuts import render


def home(request):
    return HttpResponse('Home Page')


def user_detail(request, userid):
    user = UserProfile.objects.get(user_id=userid)
    user.password = "*****"
    user_serialized = serializers.serialize('json',[user])
    return JsonResponse(user_serialized, safe=False)
