from django.http import HttpResponse
from django.http import JsonResponse
from django.core import serializers
from django.db import connection
from rest_framework.views import APIView

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


def user_detail(request, username):
    print("sdfsdf")
    user = UserProfile.objects.get(user_name=username)
    # print("User: "+user.name+ "profilePicture: "+str(user.profile_pic)+"Friends: "+frnd_list+"Groups: "+user.groups)
    user_serialized = {'id': user.user_name, 'user': user.name, 'profilepicture': str(user.profile_pic)}
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
            if moneygiven[0]!= None:
                moneygiven=moneygiven[0]
            else:
                moneygiven=0
            # print(moneygiven)
            c.execute("SELECT sum(amount) from trans where lender=%s and borrower=%s", [ friend_username[0],username])
            moneyowed = c.fetchone()
            if moneyowed[0]!= None:
                moneyowed = moneyowed[0]
            else:
                moneyowed=0
            friendlist.append({"UserName":friend_username[0], "FriendName":friend_username[0],"MoneyBorrowed":str(moneyowed),"MoneyGiven":str(moneygiven)})
    return JsonResponse(friendlist, safe=False)


def getallgroups(request, username):

    with connection.cursor() as cursor:
      row = cursor.execute("SELECT group_name, group_id FROM UG WHERE user_name='" + username + "'")
      row = row.fetchall()
    return JsonResponse(row, safe=False)



def add_friend(request,username,friend_user_name):
    print(username)
    with connection.cursor() as c:
      print(friend_user_name)
      c.execute('select * from UF where friend_user_name = %s and user_name = %s',[friend_user_name, username])
      if(username!=friend_user_name):
        if(len(c.fetchall())==0):
          c.execute('select * from UserProfile where user_name = %s',[friend_user_name])
          if(len(c.fetchall())==0):
            return  JsonResponse("Friend not registered",safe=False)
          else:
              c.execute("insert into UF (user_name, friend_user_name) values (%s,%s)",(username,friend_user_name))
              c.execute("insert into UF (friend_user_name, user_name) values (%s,%s)", (username, friend_user_name))
              return JsonResponse("Successfully added",safe=False)
        else:
          return JsonResponse("Already added", safe=False)
      else:
        return JsonResponse("Already added", safe=False)

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



class upload_img(APIView):
  def post(self,request, username, format=None):
    # users = UserProfile.objects.all()
    print("Asdas")
    print(request.data['image'])
    f=request.data['image']
    with open('media/'+username+'.png', 'wb') as destination:
      for chunk in f.chunks():
        destination.write(chunk)
        # with connection.cursor() as c:


    # with connection.cursor() as c:
    #   c.execute("select * from UserProfile where user_name = %s",[request.data['userid']]);
    #   if(len(c.fetchall())!=0):
    #     return JsonResponse("Username Already Exists", safe=False)
    #   else:
    #     c.execute("insert into UserProfile (user_name, name, password, profile_pic) values(%s,%s,%s,'default.png')",(request.data['userid'],request.data['name'],request.data['password']))
    #     return JsonResponse("Successfully added", safe=False)
    return JsonResponse("Successfully updated",safe=False)

class new_group(APIView):
    def post(self,request,username,format=None):
        # print("sfdfsdfsfsd")
    #     print(request.data)
        groupname = request.data['grp_name']
        with connection.cursor() as cursor:
            cursor.execute("select * from UG where group_name = %s and user_name = %s",[groupname, username])
            if(len(cursor.fetchall())==0):
                print(groupname,username)
                cursor.execute("INSERT INTO GId (group_name) VALUES (%s)", (groupname,))
                cursor.execute("select group_id from GId order by group_id desc")
                latest_id = cursor.fetchone()[0]
                cursor.execute("INSERT INTO UG (group_id, group_name,user_name) VALUES (%s, %s, %s)", (latest_id, groupname, username))
                return JsonResponse("Successfully created",safe=False)
            else:
                return JsonResponse("Group with same name exists already!!",safe=False)

class add_friend_in_group(APIView):
    def post(self,request, username, format=None):
        g_id=request.data['grp_id']
        f_name=request.data['friend_name']
   
        with connection.cursor() as c:
            #   print(friend_user_name)
            c.execute('select * from UF where friend_user_name = %s and user_name = %s',[f_name, username])
            if(username!=f_name):
                if(len(c.fetchall())!=0):
                    c.execute('select * from UG where user_name = %s and group_id = %s',[f_name,g_id])
                    if(len(c.fetchall())!=0):
                        return JsonResponse("Friend already added",safe=False)
                    else:
                        groupname = c.execute("Select * from GId where group_id = %s",[g_id]).fetchone()[1]
                        print(groupname)
                        c.execute("INSERT INTO UG (group_id, group_name, user_name) VALUES (%s, %s, %s)", (g_id, groupname, f_name))
                        return JsonResponse("Successfully added",safe=False)
                else:
                    return JsonResponse("Only friends can be added to a group", safe=False)
            else:
                return JsonResponse("Already added", safe=False)
            return

class get_group_members(APIView):
    def post(self,request,username,format=None):
        # print("sfdfsdfsfsd")
    #     print(request.data)
        # grp_id = request.data['grp_id']
        with connection.cursor() as cursor:
            print(username)
            row = cursor.execute("SELECT group_name, group_id FROM UG WHERE user_name='" + username + "'")
            row = row.fetchall()
            ans = []
            for r in row:
                cursor.execute("select group_id, user_name from UG where group_id = %s and user_name != %s",[r[1], username])
                res=cursor.fetchall()
                ans.append(res)
                # print()
            ans=[i for g in ans for i in g]
            return JsonResponse(ans, safe=False)

        # with connection.cursor() as cursor:
        #     cursor.execute("select * from GId where group_id = %s and username != %s",[grp_id, username])
        #     cursor.execute("select * from UG where group_id = %s and username != %s",[grp_id, username])
        #     res=cursor.fetchall()
        #     return JsonResponse(res,safe=False)

class getTransactions(APIView):
    def post(self,request,username,format=None):
        # startdate=request.data['startdate']
        # enddate=request.data['enddate']
        with connection.cursor() as cursor:
            #print(username)
            ans=[]
            row = cursor.execute("SELECT friend_user_name FROM UF WHERE user_name='" + username + "'  ")
            row=row.fetchall()
            print(row)
            for friend in row:
                lent=cursor.execute("SELECT sum(amount) FROM trans WHERE lender='" + username + "' AND borrower='"+friend[0]+"' ")
                lent=lent.fetchone()[0]
                borrowed=cursor.execute("SELECT sum(amount) FROM trans WHERE borrower='" + username + "' AND lender='"+friend[0]+"' ")
                borrowed=borrowed.fetchone()[0]
                if lent== None:
                    lent=0
                if borrowed==None:
                    res=(friend[0],lent,borrowed)
                    print(res)
                    ans.append(res)
                
        return JsonResponse(ans,safe=False)
class get_friend_details(APIView):
    def post(self,request,username,format=None):
        # print("sfdfsdfsfsd")
    #     print(request.data)
        # f_name = request.data['friend_name']
        with connection.cursor() as cursor:
            print(username)
            cursor.execute("SELECT friend_user_name from UF where user_name=%s",[username])
            friends=cursor.fetchall()
            ans = {}
            for i in friends:
                # print(i[0])
                f_name=i[0]
                cursor.execute("SELECT group_id, amount FROM trans WHERE lender = %s and borrower = %s",[username, f_name])
                row = cursor.fetchall()
                temp={}
                temp['Lent']=row
                cursor.execute("SELECT group_id, amount FROM trans WHERE lender = %s and borrower = %s",[f_name, username])
                row = cursor.fetchall()
                temp['Borrowed']=row 
                # temp=[i for g in temp for i in g]
                ans[f_name]=temp
                ans=minimizing(ans)
            return JsonResponse(ans, safe=False)

class settle_up_all(APIView):
    def post(self,request,username,format=None):
        pass
#         # print("sfdfsdfsfsd")
#         # print(request.data)
#         f_name = request.data['friend_name']
#         with connection.cursor() as cursor:
#             print(username)
#             cursor.execute("SELECT group_id, amount FROM trans WHERE lender = %s and borrower = %s",[username, f_name])
#             row = cursor.fetchall()
#             ans = {}
#             ans['Lent']=row
#             cursor.execute("SELECT group_id, amount FROM trans WHERE lender = %s and borrower = %s",[f_name, username])
#             row = cursor.fetchall()
#             ans['Borrowed']=row 
#             # ans=[i for g in ans for i in g]
#             return JsonResponse(ans, safe=False)

class add_transaction(APIView):
    def post(self,request,username,format=None):
        # print("sfdfsdfsfsd")
    #     print(request.data)
        grp_id = request.data['grp_id']
        lender = request.data['lender']
        borrower = request.data['borrower']
        desc = request.data['desc']
        amt = request.data['amt']
        tag = request.data['tag']

        with connection.cursor() as cursor:
            # cursor.execute("select * from UserFriend where user_name = %s and friend_user_name = %s",[username, username])
            cursor.execute("INSERT INTO trans (lender, borrower, group_id, desc, amount, tag) VALUES (%s, %s, %s, %s, %s, %s)", (lender, borrower, grp_id, desc, amt, tag))
            # row = cursor.fetchall()
            # ans = {}
            # ans['Lent']=row
            # cursor.execute("SELECT group_id, amount FROM trans WHERE lender = %s and borrower = %s",[f_name, username])
            # row = cursor.fetchall()
            # ans['Borrowed']=row 
            # ans=[i for g in ans for i in g]
            return JsonResponse("Successfully added", safe=False)

class tagsPieChart(APIView):
    def post(self,request,username,format=None):
        # startdate=request.data['startdate']
        # enddate=request.data['enddate']
        with connection.cursor() as cursor:
            #print(username)
            ans=[]
            tags=["movies","food","housing","travel","others"]
            for tag in tags:
                amt=cursor.execute("SELECT sum(amount) FROM trans WHERE lender='" + username + "' AND tag='"+tag+"' ")
                amt=amt.fetchone()[0]
                if amt== None:
                    amt=0
                ans.append(amt)
            
        return JsonResponse(ans,safe=False)
def minimizing(all_details):
    myMap={}
    for k in all_details:
        obj=all_details[k]
        arr=obj[Borrowed]
        for i in range(len(arr)):
            g=arr[i][0]
            m=arr[i][1]
            if g in myMap:
                myMap[g]=myMap[g]+m
            else:
                myMap[g]=m
        arr1=obj[Lent]
        for i in range(len(arr1)):
            g=arr1[i][0]
            m=arr1[i][1]
            if g in myMap:
                myMap[g]=myMap[g]-m
            else:
                myMap[g]=-m
    return myMap 
