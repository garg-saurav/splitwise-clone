from django.http import HttpResponse
from django.http import JsonResponse
from django.core import serializers
from django.db import connection
from rest_framework.views import APIView
from django.utils.datastructures import MultiValueDictKeyError
from splitapp.models import UserProfile, UserFriend, UserGroup, GroupId
from django.shortcuts import render
from django.db import connection
import datetime

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
        c.execute("SELECT friend_user_name, UserProfile.name from UF inner join UserProfile on UserProfile.user_name = UF.friend_user_name where UF.user_name='"+username+"'")
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
            friendlist.append({"UserName":friend_username[0], "FriendName":friend_username[1],"MoneyBorrowed":str(moneyowed),"MoneyGiven":str(moneygiven)})
    return JsonResponse(friendlist, safe=False)


def getallgroups(request, username):
    ans=[]
    with connection.cursor() as c:
        row = c.execute("SELECT group_id FROM UG WHERE user_name='" + username + "'")
        row = row.fetchall()
        print("heyy")
        print(row)
        for id in row:
            print(id[0])
            c.execute("SELECT sum(amount) from trans where lender=%s and group_id=%s",[username,id[0]])
            moneygiven=c.fetchone()
            if moneygiven[0]!= None:
                moneygiven=moneygiven[0]
            else:
                moneygiven=0
            # print(moneygiven)
            c.execute("SELECT sum(amount) from trans where group_id=%s and borrower=%s", [ id[0],username])
            moneyowed = c.fetchone()
            if moneyowed[0]!= None:
                moneyowed = moneyowed[0]
            else:
                moneyowed=0
            print(id[0])
            name=c.execute("SELECT group_name from GId where group_id='"+str(id[0])+"'")
            name = name.fetchone()[0]
            print(name)
            res=(id[0],name,moneygiven,moneyowed)
            ans.append(res)
    return JsonResponse(ans, safe=False)



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
        try:
            startdate=request.data['startdate']
            enddate=request.data['enddate']
        except MultiValueDictKeyError:
            startdate = "does not Exist"
            enddate=" "
            
        print(startdate)
        
        with connection.cursor() as cursor:
            #print(username)
            ans=[]
            row = cursor.execute("SELECT friend_user_name FROM UF WHERE user_name='" + username + "'  ")
            row=row.fetchall()
            print(row)
            for friend in row:
                lent=cursor.execute("SELECT sum(amount) FROM trans WHERE lender='" + username + "' AND borrower='"+friend[0]+"' AND date_time>='"+startdate+"' AND date_time<='"+enddate+"' ")
                lent=lent.fetchone()[0]
                borrowed=cursor.execute("SELECT sum(amount) FROM trans WHERE borrower='" + username + "' AND lender='"+friend[0]+"' AND date_time>='"+startdate+"' AND date_time<='"+enddate+"' ")
                borrowed=borrowed.fetchone()[0]
                if lent== None:
                    lent=0
                if borrowed==None:
                    borrowed=0
                res=(friend[0],lent,borrowed)
                print(res)
                ans.append(res)
                
        return JsonResponse(ans,safe=False)

class bargraph2(APIView):

    def post(self,request,username,format=None):
        ans=[]
        try:
            startdate=request.data['startdate']
            enddate=request.data['enddate']
        except MultiValueDictKeyError:
            startdate = "does not Exist"
            enddate="does not exist"
                 
        with connection.cursor() as c:
            row = c.execute("SELECT group_id FROM UG WHERE user_name='" + username + "'")
            row = row.fetchall()
        
            for id in row:
                print(id[0])
                c.execute("SELECT sum(amount) from trans where lender=%s and group_id=%s AND date_time>='"+startdate+"' AND date_time<='"+enddate+"'",[username,id[0]])
                moneygiven=c.fetchone()
                if moneygiven[0]!= None:
                    moneygiven=moneygiven[0]
                else:
                    moneygiven=0
                # print(moneygiven)
                c.execute("SELECT sum(amount) from trans where group_id=%s and borrower=%s AND date_time>='"+startdate+"' AND date_time<='"+enddate+"'", [ id[0],username])
                moneyowed = c.fetchone()
                if moneyowed[0]!= None:
                    moneyowed = moneyowed[0]
                else:
                    moneyowed=0
                
                name=c.execute("SELECT group_name from GId where group_id='"+str(id[0])+"'")
                name = name.fetchone()[0]
                print(name)
                res=(name,moneygiven,moneyowed)
                ans.append(res)
        return JsonResponse(ans, safe=False)
        #     #print(username)
        #     ans=[]
        #     row = cursor.execute("SELECT group_id FROM trans WHERE user_name='" + username + "'  ")
        #     row=row.fetchall()
        #     print(row)
        #     for id in row:
        #         getallgroups()
        #         lent=cursor.execute("SELECT sum(amount) FROM trans WHERE lender='" + username + "' AND borrower='"+friend[0]+"' AND date_time>='"+startdate+"' AND date_time<='"+enddate+"' ")
        #         lent=lent.fetchone()[0]
        #         borrowed=cursor.execute("SELECT sum(amount) FROM trans WHERE borrower='" + username + "' AND lender='"+friend[0]+"' AND date_time>='"+startdate+"' AND date_time<='"+enddate+"' ")
        #         borrowed=borrowed.fetchone()[0]
        #         if lent== None:
        #             lent=0
        #         if borrowed==None:
        #             borrowed=0
        #         res=(friend[0],lent,borrowed)
        #         print(res)
        #         ans.append(res)
                
        # return JsonResponse(ans,safe=False)

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
                cursor.execute('Select name from UserProfile where user_name=%s',[i[0]])
                res=cursor.fetchone()
                friend_name=res[0]
                cursor.execute("SELECT trans.group_id, amount, group_name FROM trans inner join GId on trans.group_id = GId.group_id WHERE lender = %s and borrower = %s",[username, f_name])
                row = cursor.fetchall()
                temp={}
                temp['Lent']=row
                cursor.execute("SELECT trans.group_id, amount, group_name FROM trans inner join GId on trans.group_id = GId.group_id WHERE lender = %s and borrower = %s",[f_name, username])
                row = cursor.fetchall()
                temp['Borrowed']=row 
                # temp=[i for g in temp for i in g]
                ans[f_name+":"+friend_name]=temp
            ans=minimizing(ans)
            print(ans)
            return JsonResponse(ans, safe=False)

class settle_up_all(APIView):
    def post(self,request,username,format=None):
        friend_id=request.data['friend_id']
        print("[[]][[]][[]]")
        with connection.cursor() as cursor:
            map={}
            # cursor.execute("select * from UserFriend where user_name = %s and friend_user_name = %s",[username, username])
            cursor.execute("SELECT GId.group_id, SUM(amount), group_name FROM trans inner join GId on trans.group_id = GId.group_id  WHERE lender = %s and borrower = %s GROUP BY GId.group_id",[username,friend_id])
            l1=cursor.fetchall()
            temp={}
            l=[]
            for i in range(len(l1)):
                g=l1[i][0]
                am=l1[i][1]
                nam=l1[i][2]
                l=l+[[g,am,nam]]
            temp['Lent']=l
            cursor.execute("SELECT GId.group_id,SUM(amount), group_name FROM trans inner join GId on trans.group_id = GId.group_id WHERE lender = %s and borrower = %s GROUP BY GId.group_id",[friend_id,username])
            l1=cursor.fetchall()
            l=[]
            for i in range(len(l1)):
                g=l1[i][0]
                m=l1[i][1]
                nam=l1[i][2]
                l=l+[[g,m,nam]]
            temp['Borrowed']=l
            map[friend_id]=temp
            k=minimizing(map)
            print("YoBro", k)
            kl=k[friend_id]
            for g_id in kl:
                amount=float(kl[g_id][0])
                if amount > 0:
                    cursor.execute("INSERT INTO trans (lender,borrower,group_id,desc,amount,tag, date_time) VALUES (%s, %s, %s, %s, %s, %s, %s)",(username,friend_id,g_id,'settlling up',amount,'others',datetime.datetime.now()))
                elif amount < 0:
                    cursor.execute("INSERT INTO trans (lender,borrower,group_id,desc,amount,tag,date_time) VALUES (%s, %s, %s, %s, %s, %s, %s)",(friend_id,username,g_id,'settlling up',(-1)*amount,'others',datetime.datetime.now()))
                else:
                    pass
            return JsonResponse("Successfully settled up", safe=False)
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

class leave_group(APIView):
    def post(self,request,username,format=None):
        grp_id = request.data['grp_id']
        with connection.cursor() as cursor:
            cursor.execute("SELECT SUM(amount) FROM trans WHERE lender = %s and group_id = %s",[username,grp_id])
            res=cursor.fetchall()
            if res [0] != 0:
                return JsonResponse("Cannot Leave Group as you're not settled up yet with everyone", safe=False)
            else:
                cursor.execute("SELECT SUM(amount) FROM trans WHERE borrower = %s and group_id = %s",[username,grp_id])
                if res[0] != 0:
                    return JsonResponse("Cannot Leave Group as you're not settled up yet with everyone", safe=False)
                else:
                    cursor.execute("DELETE * FROM UG where user_name = %s group_id = %s",[username,grp_id])
                    cursor.execute("SELECT * FROM UG where group_id = %s",[grp_id])
                    res.cursor.fetchall()
                    if len(res) == 0:
                        cursor.execute("DELETE * FROM GId where group_id = %s",[grp_id])
                    return JsonResponse("Left Group", safe=False)

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
            cursor.execute("INSERT INTO trans (lender, borrower, group_id, desc, amount, tag,date_time) VALUES (%s, %s, %s, %s, %s, %s, %s)", (lender, borrower, grp_id, desc, amt, tag, datetime.datetime.now()))
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
        try:
            startdate=request.data['startdate']
            enddate=request.data['enddate']
        except MultiValueDictKeyError:
            startdate = "does not Exist"
            enddate=" "
        with connection.cursor() as cursor:
            #print(username)
            ans=[]
            tags=["movies","food","housing","travel","others"]
            for tag in tags:
                
                amt=cursor.execute("SELECT sum(amount) FROM trans WHERE lender='" + username + "' AND tag='"+tag+"' AND date_time>='"+startdate+"' AND date_time<='"+enddate+"'  ")
                amt=amt.fetchone()[0]
                if amt== None:
                    amt=0
                
                ans.append(amt)
            
        return JsonResponse(ans,safe=False)

class friendsPieChart(APIView):
    def post(self,request,username,format=None):
        try:
            startdate=request.data['startdate']
            enddate=request.data['enddate']
        except MultiValueDictKeyError:
            startdate = "does not Exist"
            enddate=" "
            
        
        with connection.cursor() as cursor:
            #print(username)
            ans=[]
            row = cursor.execute("SELECT friend_user_name FROM UF WHERE user_name='" + username + "'  ")
            row=row.fetchall()
            print(row)
            for friend in row:
                amount=cursor.execute("SELECT sum(amount) FROM trans WHERE lender='" + username + "' AND borrower='"+friend[0]+"' AND date_time>='"+startdate+"' AND date_time<='"+enddate+"' ")

                amount=amount.fetchone()[0]
                amount1=cursor.execute("SELECT sum(amount) FROM trans WHERE lender='" + friend[0] + "' AND borrower='"+username+"' AND date_time>='"+startdate+"' AND date_time<='"+enddate+"' ")
                amount1=amount1.fetchone()[0]
                if amount==None:
                    sum=amount1
                elif amount1==None:
                    sum=amount
                else:
                    sum=amount+amount1
                res=(friend[0],sum)
                #print(res)
                ans.append(res)
                
        return JsonResponse(ans,safe=False)


class timeSeriesPlot(APIView):
    def post(self,request,username,format=None):
        startdate=request.data['startdate']
        enddate=request.data['enddate']
        with connection.cursor() as cursor:
            #print(username)
            ans=[]
            amt=cursor.execute("SELECT date_time,amount FROM trans WHERE lender='" + username + "' AND date_time>='"+startdate+"' AND date_time<='"+enddate+"' ")
            amt=amt.fetchall()
            print(amt)
            
            for i in amt:
                res=[]
                res.append(i)
                #print(res)
                ans.append(res)
                #print(i)
            
            #print(ans)
             
        return JsonResponse(amt,safe=False)

def minimizing(all_details):
    myMap={}
    for k in all_details:
        temp={}
        obj=all_details[k]
        arr=obj['Borrowed']
        for i in range(len(arr)):
            g=arr[i][0]
            m=arr[i][1]
            nam=arr[i][2]
            m=float(m)
            if g in temp:
                temp[g][0]=temp[g][0]+m
            else:
                temp[g]=[m,nam]
        arr1=obj['Lent']
        for i in range(len(arr1)):
            g=arr1[i][0]
            m=arr1[i][1]
            nam=arr1[i][2]
            m=float(m)
            if g in temp:
                temp[g][0]=temp[g][0]-m
            else:
                temp[g]=[-1*(m),nam]
        myMap[k]=temp
    return myMap 
#id,lis
class settle_up(APIView):
    def post(self,request,username,format=None):
        # print("sfdfsdfsfsd")
    #     print(request.data)
        grp_id = request.data['grp_id']
        friend_list = request.data['friends']

        with connection.cursor() as cursor:
            # cursor.execute("select * from UserFriend where user_name = %s and friend_user_name = %s",[username, username])
            amount=0
            for f in friend_list:  
                cursor.execute("SELECT SUM(amount) FROM trans WHERE lender = %s and borrower = %s and group_id = %s",[f, username,grp_id])
                am=cursor.fetchall()
                amount=amount+float(am[0])
                cursor.execute("SELECT SUM(amount) FROM trans WHERE lender = %s and borrower = %s and group_id = %s",[username,f,grp_id])
                am=cursor.fetchall()
                amount=amount-float(am[0])
                if amount>0:
                    cursor.execute("INSERT INTO trans (lender,borrower,group_id,desc,amount,tag) VALUES (%s, %s, %s, %s, %s, %s)",(username,f,grp_id,'settlling up',amount,'others'))
                elif amount<0:
                    cursor.execute("INSERT INTO trans (lender,borrower,group_id,desc,amount,tag) VALUES (%s, %s, %s, %s, %s, %s)",(f,username,grp_id,'settlling up',(-1)*amount,'others'))
                else:
                    pass
            # row = cursor.fetchall()
            # ans['Borrowed']=row 
            # ans=[i for g in ans for i in g]
            return JsonResponse("Successfully settled up", safe=False)

class get_group_transactions(APIView):
    def post(self,request,username,format=None):
        grp_id = request.data['grp_id']
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM trans where group_id=%s",[grp_id])
            result=cursor.fetchall()
            return JsonResponse(result,safe=False)

class balances(APIView):
    def post(self,request,username,format=None):
        grp_id = request.data['grp_id']
        result=[]
        with connection.cursor() as cursor:
            cursor.execute("SELECT user_name FROM UG WHERE group_id=%s and user_name!=%s",[grp_id,username])
            members=cursor.fetchall()
            mymap={}
            for m in members:
                amount=0
                cursor.execute("SELECT SUM(amount) from trans where lender=%s and borrower = %s and group_id=%s",[username,m[0],grp_id])
                am=cursor.fetchall()
                amount=amount-float(am[0])
                cursor.execute("SELECT SUM(amount) from trans where lender=%s borrower=%s and group_id=%s",[m[0],username,grp_id])
                am=cursor.fetchall()
                amount=amount+float(am[0])
                mymap[m[0]]=amount
            result=result+[mymap]
            for m in members:
                amount=0
                cursor.execute("SELECT SUM(amount) from trans where lender=%s and group_id=%s",[m[0],grp_id])
                am=cursor.fetchall()
                amount=amount-float(am[0])
                cursor.execute("SELECT SUM(amount) from trans where borrower=%s and group_id=%s",[m[0],grp_id])
                am=cursor.fetchall()
                amount=amount+float(am[0])
                result=result+[[m[0],amount]]
            return JsonResponse(result,safe=False)

class min_transaction(APIView):
    def post(self,request,username,format=None):
        grp_id=request.data['grp_id']
        lender=request.data['lender']
        borrower=request.data['borrower']
        amount=request.data['amount']
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM trans where group_id=%s",[grp_id])
            transactions=cursor.fetchall()
            mymap={}
            visited={}
            dfsfinnum={}
            mymap[lender]={borrower:float(amount)}
            mymap[borrower]={lender:(-1)*float(amount)}
            for r in res:
                if r[1] in mymap:
                    if r[2] in mymap[r[1]]:
                        mymap[r[1]][r[2]]+=float(r[4])
                    else:
                        mymap[r[1]]=Merge(mymap,{r[2]:float(r[4])})
                else:
                    mymap[r[1]]={r[2]:float(r[4])}
                    visited[r[1]]=0
                    dfsfinnum[r[1]]=-1
                if r[2] in mymap:
                    if r[1] in mymap[r[2]]:
                        mymap[r[2]][r[1]]-=float(r[4])
                    else:
                        mymap[r[2]]=Merge(mymap,{r[1]:(-1)*float(r[4])})
                else:
                    mymap[r[2]]={r[1]:(-1)*float(r[4])}
                    visited[r[2]]=0
                    dfsfinnum[r[2]]=-1
            for k in mymap:
                sum=0
                for k1 in mymap[k]:
                    if mymap[k][k1]==0:
                        del mymap[k][k1]
                    else:
                        sum=sum+1
                if sum==0:
                    del mymap[k]
            backedge=[]
            parent=[]
            def dfs(node):
                for k in mymap[node]:
                    if(len(backedge)!=0):
                        return
                    if visited[k]==0:
                        parent[k]=node
                        dfs(k)
                    elif dfsfinnum[k]==-1 and k!=parent[node]:
                        backedge=[{node:k}]
                        parent[k]=node
                        return
                    else:
                        continue
                return
            dfs(lender)
            if len(backedge)==0:
                return JsonResponse("Decreasing number of transactions not possible",safe=False)
            else:
                n=[k for k in backedge]
                edc=mymap[parent[n[0]]][n[0]]
                mincost_edge(parent[n[0]])
                def mincost_edge(node):
                    if mymap[parent[node]][node]<ed:
                        edc=mymap[parent[node]][node]
                    if parent[node]==n[0]:
                        return
                    else:
                        mincost_edge(parent[node])
                    return
                def add_new_transactions(node):
                    cursor.execute("INSERT INTO trans (lender,borrower,group_id,desc,amount,tag) VALUES (%s, %s, %s, %s, %s, %s)",(node,parent[node],grp_id,'reducing no of transactions',edc,'others'))
                    if parent[node]==n[0]:
                        return
                    else:
                        add_new_transactions(parent[node])
                    return
                return JsonResponse("Transactions minimized",safe=False)

                    

                

                    

                            
