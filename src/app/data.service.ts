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
  my_username;
  profile:any;
  friends:any;
  groups:any;

  constructor(
    private http:HttpClient
  ) { }

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

}
