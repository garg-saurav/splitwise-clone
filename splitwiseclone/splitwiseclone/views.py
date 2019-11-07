from django.http import HttpResponse
from django.http import JsonResponse
from django.core import serializers
from django.db import connection
from splitapp.models import UserProfile, UserFriend, UserGroup
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



def user_detail(request, userid):
    print("sdfsdf")
    user = UserProfile.objects.get(user_name=userid)
    # print("User: "+user.name+ "profilePicture: "+str(user.profile_pic)+"Friends: "+frnd_list+"Groups: "+user.groups)
    user_serialized = {'id': user.user_name, 'user': user.name, 'profilepicture': str(user.profile_pic), 'friends': user.friends, 'groups': user.groups}
    return JsonResponse(user_serialized, safe=False)


def getfriendlist(request, username):
    friendlist=[]
    with connection.cursor() as c:
        c.execute("SELECT friend_user_name from UF where user_name='"+username+"'")
        lest = c.fetchall()
        for friend_username in lest:
            print("Hereeeee")
            print(str(friend_username[0]))
            c.execute("SELECT sum(amount) from trans where lender=%s and borrower=%s",[username,friend_username[0]])
            moneygiven=c.fetchone()
            if moneygiven!= None:
                moneygiven=moneygiven[0]
            # print(moneygiven)
            c.execute("SELECT sum(amount) from trans where lender=%s and borrower=%s", [ friend_username[0],username])
            moneyowed = c.fetchone()
            if moneyowed != None:
                moneyowed = moneyowed[0]
            friendlist.append("Friend Name: "+str(friend_username[0])+"\n"+" Money Borrowed: "+str(moneyowed)+"\n"+" Money Given: "+str(moneygiven))
    return JsonResponse(friendlist, safe=False)


def getallgroups(request, username):

    with connection.cursor() as cursor:
      row = cursor.execute("SELECT group_name FROM UG WHERE user_name='" + username + "'")
      row = row.fetchall()
    return JsonResponse(row, safe=False)




def add_friend(request,username,friend_username):
    friendlist=getfriendlist(None,username)
    print(1233)
    with connection.cursor() as cursor:
        cursor.execute("SELECT id from UserProfile where user_name='"+friend_username+"'")
        print("huehuhhd")
        friendid =cursor.fetchone()[0]
        print(friendid)
        friendlist.append(friendid)
        cursor.execute("UPDATE UserProfile SET friends= '{0}' where user_name='{1}'".format(friendlist,username))
    return HttpResponse("Successfully added "+friend_username)


def pay_friend(request,username,friendname,amount):
    with connection.cursor() as cursor:
        cursor.execute("SELECT id from UserProfile where user_name=%s",friendname)
        friendid =cursor.fetchone()
        cursor.execute("SELECT id from UserProfile where user_name=%s", username)
        userid=cursor.fetchone()
        cursor.execute("INSERT INTO trans (lender,borrower,groupid,amount) VALUES(?,?,?,?)",[friendid,userid,-1,amount])
        # tobepayed=cursor.execute("SELECT sum(amount) from Transaction where lender=%n and borrower=%n", [friendid, userid])
    return

def pay_in_group():
    return
def new_group(request, username, groupname):
    print("YIHFIDNIN")
    with connection.cursor() as cursor:
        cursor.execute("SELECT id from UserProfile where user_name=%s",[username])
        userid = cursor.fetchone()[0]
        print("HEYGYH")
        print(userid)
        grouplist = getallgroups(None,username)
        print(grouplist)
        cursor.execute("INSERT INTO GROUPS (group_name,users) VALUES(%s, %s)", (groupname, userid))
        cursor.execute("SELECT group_id from GROUPS where group_name='"+groupname+"'")
        groupid = cursor.fetchone()[0]
        grouplist.append(groupid)
        cursor.execute("UPDATE UserProfile SET groups.append('{0}') where user_id='{1}'".format(groupid,userid))
    return HttpResponse("Successfully created "+groupname)
def add_friend_in_group():
    return
