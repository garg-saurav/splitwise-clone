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
                    console.log(data);
                  })
    
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
