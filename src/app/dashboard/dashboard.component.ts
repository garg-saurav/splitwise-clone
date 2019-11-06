import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  
  user:any;
  constructor(private dataService:DataService) { 
    
  }

  ngOnInit(){
    this.user=this.dataService.get_profile_data();
    console.log(this.user.name,this.user.uname);
  }

}
