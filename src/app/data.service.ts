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
  _URL_add_friend = 'http://127.0.0.1:8000/addfriend/';
  _URL_groups =  'http://127.0.0.1:8000/groups/';
  _URL_img =  'http://127.0.0.1:8000/uploadimg/';
  _URL_add_group = 'http://127.0.0.1:8000/newgroup/';
  _URL_add_group_member = 'http://127.0.0.1:8000/addmember/';
  _URL_get_members = 'http://127.0.0.1:8000/members/';
  _URL_insights = 'http://127.0.0.1:8000/insight/';
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
  get_insights(){
    const fd = new FormData;
    return this.http.post(this._URL_insights+localStorage.getItem('username')+"/",fd);
  }

}
