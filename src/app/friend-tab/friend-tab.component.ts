import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
@Component({
  selector: 'app-friend-tab',
  templateUrl: './friend-tab.component.html',
  styleUrls: ['./friend-tab.component.css']
})
export class FriendTabComponent implements OnInit {
  friend:any;
  constructor(private dataService:DataService) { }
  ngOnInit(){
    this.friend=this.dataService.get_friends_data();
    //console.log(this.friend.friend,this.user.uname);
  }

}
