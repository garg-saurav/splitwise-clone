import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
  user:any;
  constructor(private dataService:DataService) { 
    
  }

  ngOninit(){
    this.dataService.get_profile_data();
  }

}
