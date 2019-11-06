import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  _URL = 'http://localhost:8000/account/login/';
  my_id:any;
  profile:any;
  friends:any;
  groups:any;

  constructor(
    private http:HttpClient
  ) { }

  get_profile_data(){
    return {'Name':'Rajat Jain','User_Name':'Rajjo'}
    // this.http.get(this._URL_profile)
    //     .subscribe(data => {
    //       this.profile = data;
    //     })
  }


  // get_friends_data(){
  //   this.http.get(this._URL_friends)
  //       .subscribe(data => {
  //         this.profile = data;
  //       })
  // }


  // get_groups_data(){
  //   this.http.get(this._URL_groups)
  //       .subscribe(data => {
  //         this.profile = data;
  //       })
  // }

  post_data(entry:any){
    this.http.post(this._URL,entry,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
    .subscribe(data =>{
          console.log(data);
          this.my_id=data;
    }
    )
  }

}
