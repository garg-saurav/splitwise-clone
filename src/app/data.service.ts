import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  _URL = 'http://localhost:8000/account/login/';
  _URL_reg = 'http://127.0.0.1:8000/account/signup/';
  _URL_user = 'http://127.0.0.1:8000/user/';
  _URL_friends = 'http://127.0.0.1:8000/friends/';
  _URL_friends_details = 'http://127.0.0.1:8000/frienddetails/';
  _URL_add_friend = 'http://127.0.0.1:8000/addfriend/';
  _URL_groups =  'http://127.0.0.1:8000/groups/';
  _URL_img =  'http://127.0.0.1:8000/uploadimg/';
  _URL_add_group = 'http://127.0.0.1:8000/newgroup/';
  _URL_add_group_member = 'http://127.0.0.1:8000/addmember/';
  _URL_get_members = 'http://127.0.0.1:8000/members/';
  _URL_insights = 'http://127.0.0.1:8000/insight/';
  _URL_BarGraph1 = 'http://127.0.0.1:8000/bargraph1/';
  _URL_BarGraph2 = 'http://127.0.0.1:8000/bargraph2/';
  _URL_timeseriesplot = 'http://127.0.0.1:8000/timeseriesplot/';
  _URL_PieChartTags = 'http://127.0.0.1:8000/pieChartTags/';
  _URL_friendspiechart = 'http://127.0.0.1:8000/friendspiechart/';
  _URL_friendshipchart = 'http://127.0.0.1:8000/friendshipchart/';
  _URL_settleupall = 'http://127.0.0.1:8000/settleupall/';
  _URL_trans = 'http://127.0.0.1:8000/addtrans/';
  _URL_getbalances = 'http://127.0.0.1:8000/balances/';
  _URL_getbalances2 = 'http://127.0.0.1:8000/balances2/';
  _URL_leave = 'http://127.0.0.1:8000/leave/';
  _URL_settleup = 'http://127.0.0.1:8000/settleup/';
_URL_grouptransactions='http://127.0.0.1:8000/grouptrans/';
  my_username;
  profile:any;
  friends:any;
  groups:any;

  constructor(
    private http:HttpClient
  ) { }

  // authenticate(){
  //   if(localStorage)
  // }

  add_trans(fd: FormData){
    fd.append('_lender',localStorage.getItem('username'));
    return this.http.post(this._URL_trans+localStorage.getItem('username')+"/",fd);
  }

  get_profile_data(){
    console.log("Hello",localStorage.getItem('username'));
    // return {'Name':'Rajat Jain','User_Name':'Rajjo'}
    return this.http.get(this._URL_user+localStorage.getItem('username'));
        
    
  }


  get_friends_data(){
    // return {"friend":'Saurav Garg',"lent":'$100',"borrowed":'$500'}
      // ,{"friend":'Gaurav Garg',"lent":'$100',"borrowed":'$500'}
    // ]
    return this.http.get(this._URL_friends+localStorage.getItem('username'));
  }


  get_groups_data(){
    // return {"group":'Vicerant',"lent":'10 Outlabs',"borrowed":'1 Project'}
    console.log(this._URL_groups+localStorage.getItem('username'));
    return this.http.get(this._URL_groups+localStorage.getItem('username'));
        
  }

  post_data(entry:any){
    return this.http.post(this._URL,entry,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  add_group(entry:any){
    console.log(entry);
    return this.http.post(this._URL_add_group+localStorage.getItem('username')+"/",entry,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  add_group_member(grp_id, entry:any){
    const fd=new FormData;
    fd.append('grp_id',grp_id);
    fd.append('friend_name',entry.userid);
    return this.http.post(this._URL_add_group_member+localStorage.getItem('username')+"/",fd);
    // return this.http.post(this._URL_add_group_member+localStorage.getItem('userid')+"/",entry,{
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json'
    //   })
    // });
  }

  uploadProfilePic(image:File){
    const fd=new FormData;
    fd.append('image',image)
    console.log("IHaveASelfishFriend",fd)
    return this.http.post(this._URL_img+localStorage.getItem('username')+"/",fd);
      
  }

  post_data_register_user(entry:any){
    return this.http.post(this._URL_reg,entry,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });

  }

  get_req_add_friend(fName){
    return this.http.get(this._URL_add_friend+localStorage.getItem('username')+"/"+fName);
  }

  get_group_members(){
    const fd = new FormData;
    return this.http.post(this._URL_get_members+localStorage.getItem('username')+"/",fd);
  }
  get_insights(startdate,enddate:any){
    const fd = new FormData;
    fd.append('startdate',startdate);
    fd.append('enddate',enddate);
    return this.http.post(this._URL_insights+localStorage.getItem('username')+"/",fd);
  }

  get_friends_details(){
    const fd = new FormData;
    return this.http.post(this._URL_friends_details+localStorage.getItem('username')+"/",fd);
  }

  tagsPieChart(startdate,enddate:any){
    const fd = new FormData;
    fd.append('startdate',startdate);
    fd.append('enddate',enddate);
    return this.http.post(this._URL_PieChartTags+localStorage.getItem('username')+"/",fd);
  }

  friendspiechart(startdate,enddate:any){
    const fd = new FormData;
    fd.append('startdate',startdate);
    fd.append('enddate',enddate);
    return this.http.post(this._URL_friendspiechart+localStorage.getItem('username')+"/",fd);
  }

  get_bargraph1(startdate,enddate:any){
    const fd = new FormData;
    fd.append('startdate',startdate);
    fd.append('enddate',enddate);
    return this.http.post(this._URL_BarGraph1+localStorage.getItem('username')+"/",fd);
  }
  get_bargraph2(startdate,enddate:any){
    const fd = new FormData;
    fd.append('startdate',startdate);
    fd.append('enddate',enddate);
    return this.http.post(this._URL_BarGraph2+localStorage.getItem('username')+"/",fd);
  }

  timeseriesplot(startdate,enddate:any){
    const fd = new FormData;
    fd.append('startdate',startdate);
    fd.append('enddate',enddate);
    return this.http.post(this._URL_timeseriesplot+localStorage.getItem('username')+"/",fd);
  }

  friendshipchart(startdate,enddate:any){
    const fd = new FormData;
    fd.append('startdate',startdate);
    fd.append('enddate',enddate);
    return this.http.post(this._URL_friendshipchart+localStorage.getItem('username')+"/",fd);
  }

  settleupall(f_name){
    const fd = new FormData;
    fd.append('friend_id',f_name);
    return this.http.post(this._URL_settleupall+localStorage.getItem('username')+"/",fd);
  }

  getbalances(grp_id){
    const fd = new FormData;
    fd.append('grp_id',grp_id);
    return this.http.post(this._URL_getbalances+localStorage.getItem('username')+"/",fd);
  }
  getbalances2(grp_id){
    const fd = new FormData;
    fd.append('grp_id',grp_id);
    return this.http.post(this._URL_getbalances2+localStorage.getItem('username')+"/",fd);
  }
  leave(gid){
    const fd = new FormData;
    fd.append('grp_id',gid);
    return this.http.post(this._URL_leave+localStorage.getItem('username')+"/",fd);
  }

  settleup(fd){
    return this.http.post(this._URL_settleup+localStorage.getItem('username')+"/",fd);
  }
  grouptransactions(grp_id){
    const fd = new FormData;
    fd.append('grp_id',grp_id);
    return this.http.post(this._URL_grouptransactions+localStorage.getItem('username')+"/",fd);
  }
}
