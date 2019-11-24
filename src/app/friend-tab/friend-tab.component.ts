import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-friend-tab',
  templateUrl: './friend-tab.component.html',
  styleUrls: ['./friend-tab.component.css']
})
export class FriendTabComponent implements OnInit {
  friend:any;
  show=true;
  begin=1;
  detailed_f_name:any;
  all_details:any;
  all_details_keys;

  constructor(private dataService:DataService,private router:Router) { }
  ngOnInit(){
    this.dataService.get_friends_data()
                  .subscribe(data => {
                    // this.profile = data;
                    this.friend=data;
                    console.log(this.friend);
                  })
    this.dataService.get_friends_details()
                  .subscribe(data => {
                    this.all_details=data;
                    this.all_details_keys=Object.keys(this.all_details);
                    console.log("SDfsdf")
                    console.log(data);
                  })
                  
  }
  func(amount){
    if(amount==0){
      return "You are settled up"
    }
    else if(amount<0){
      return "The person owes you "+((-1)*amount).toString()
    }
    else{
      return "You owe the person "+amount.toString()
    }
    return "yeah"
  }
  onClick(f){
    // this.show=!this.show;
    if(f.UserName == this.detailed_f_name){
      this.show=!this.show;
      if(this.show==false){
        this.detailed_f_name=null;
        this.show=true;
      }
    }else{
    this.detailed_f_name=f.UserName;
    
  }
    console.log(f);
  }

 

  logout(){
    localStorage.removeItem('username');
    this.router.navigate(['/login']);


  }

}
