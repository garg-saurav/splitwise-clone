from django.http import HttpResponse
from django.http import JsonResponse
from django.core import serializers
from django.db import connection
from splitapp.models import UserProfile,Transaction
from django.shortcuts import render
from django.db import connection

# class login_view(APIView):
#   def post(self,request, format=None):
#     users = UserProfile.objects.all()
#     print(request.data)
#     with connection.cursor() as c:
#       c.execute("select password from UserProfile where name = %s",[request.data['userid']])
#       res=c.fetchone()
#     print(res)
#     serializer = userserializer(users, many=True)
#     return JsonResponse(request.data, safe=False)

def home(request):
    return HttpResponse('Home Page')


def getfriends(frndid):
    with connection.cursor() as cursor:
      row = cursor.execute("SELECT name FROM UserProfile WHERE id='"+frndid+"'")
      row = row.fetchone()
    return row


def user_detail(request, userid):
    print("sdfsdf")
    user = UserProfile.objects.get(user_name=userid)
    # print("User: "+user.name+ "profilePicture: "+str(user.profile_pic)+"Friends: "+frnd_list+"Groups: "+user.groups)
    user_serialized = {'id': user.user_name, 'user': user.name, 'profilepicture': str(user.profile_pic), 'friends': user.friends, 'groups': user.groups}
    return JsonResponse(user_serialized, safe=False)


def getfriendlist(request, userid):
    user = UserProfile.objects.get(user_name=userid)
    frnd_list = []
    for frnd in user.friends:
      frnd_list.append(getfriends(frnd))
      print(getfriends(frnd))
    return JsonResponse(frnd_list, safe=False)


def getallgroups(request, userid):
    user_groups = UserProfile.objects.get(user_name=userid).groups
    groups = []
    with connection.cursor() as cursor:
      for groupid in user_groups:

        row = cursor.execute("SELECT group_name FROM Groups WHERE group_id='"+groupid+"'")
        row = row.fetchone()
        groups.append(row)

    return JsonResponse(groups, safe=False)


def add_friend():
    with connection.cursor() as cursor:
        cursor.execute("INSERT INTO GROUPS (group_name,users) VALUES(%s, %s)", (groupname, userid))
        groupid=cursor.execute("SELECT group_id from GROUPS where group_name='"+groupname+"'")
        cursor.execute("UPDATE UserProfile SET groups= '{0}' where user_id='{1}'".format(groupid,userid))
    return HttpResponse("Successfully created "+groupname)

def pay_friend():
    return
def pay_in_group():
    return
def new_group(request, userid, groupname):
    with connection.cursor() as cursor:
        cursor.execute("INSERT INTO GROUPS (group_name,users) VALUES(%s, %s)", (groupname, userid))
        groupid=cursor.execute("SELECT group_id from GROUPS where group_name='"+groupname+"'")
        cursor.execute("UPDATE UserProfile SET groups= '{0}' where user_id='{1}'".format(groupid,userid))
    return HttpResponse("Successfully created "+groupname)
def add_friend_in_group():
    return
