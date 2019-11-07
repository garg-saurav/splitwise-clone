import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  _URL = 'http://localhost:8000/account/login/';
  _URL_reg = 'http://127.0.0.1:8000/account/signup/';
  my_id:any;
  profile:any;
  friends:any;
  groups:any;

  constructor(
    private http:HttpClient
  ) { }

  get_profile_data(){
    return {"name":'Rajat Jain',"uname":'Rajjo',"imgurl":'../../assets/img1.jpg'};
    // this.http.get(this._URL_profile)
    //     .subscribe(data => {
    //       this.profile = data;
    //     })
  }


  get_friends_data(){
    return [{"friend":'Saurav Garg',"lent":'$100',"borrowed":'$500'}
      ,{"friend":'Gaurav Garg',"lent":'$100',"borrowed":'$500'}
    ]
  //   this.http.get(this._URL_friends)
  //       .subscribe(data => {
  //         this.profile = data;
  //       })
  }


  get_groups_data(){
    return {"group":'Vicerant',"lent":'10 Outlabs',"borrowed":'1 Project'}
    // this.http.get(this._URL_groups)
    //     .subscribe(data => {
    //       this.profile = data;
    //     })
  }

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

  post_data_register_user(entry:any){
    this.http.post(this._URL_reg,entry,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
    .subscribe(data =>{
          console.log(data);
          // this.my_id=data;
    }
    )
  }

}
