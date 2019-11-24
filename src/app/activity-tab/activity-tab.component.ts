import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
//import {NgPipesModule} from 'ngx-pipes';
@Component({
  selector: 'app-activity-tab',
  templateUrl: './activity-tab.component.html',
  styleUrls: ['./activity-tab.component.css']
})
export class ActivityTabComponent implements OnInit {

  constructor(private dataService:DataService,private router:Router) { }
  activity:any;
  ngOnInit() {
    this.dataService.getactivity()
                  .subscribe(data => {
                    this.activity = data;
                    console.log("asdf",this.activity);
                  });
  }

  logout(){
    localStorage.removeItem('username');
    this.router.navigate(['/login']);


  }

}
