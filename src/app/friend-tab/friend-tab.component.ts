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
    this.dataService.get_friends_data()
                  .subscribe(data => {
                    // this.profile = data;
                    this.friend=data;
                    console.log(this.friend);
                  })
    
  }

  logout(){
    localStorage.removeItem('username');
    this.router.navigate(['/login']);


  }

}
