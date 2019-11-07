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
  constructor(private dataService:DataService,private router:Router) { }
  ngOnInit(){
    this.friend=this.dataService.get_friends_data();
    //console.log(this.friend.friend,this.user.uname);
  }

  logout(){
    localStorage.removeItem('username');
    this.router.navigate(['/login']);


  }

}
