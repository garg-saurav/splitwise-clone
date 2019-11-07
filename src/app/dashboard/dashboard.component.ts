import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  
  
  user:any;
  constructor(private dataService:DataService,private router:Router) { 
    this.dataService.get_profile_data()
                .subscribe(data => {
                  this.user = data;
                  // this.profile = data;
                  // return this.profile;
                })
    console.log("In dashboard.component.ts",  this.user);
    
    
  }

  logout(){
    localStorage.removeItem('username');
    this.router.navigate(['/login']);


  }


}
