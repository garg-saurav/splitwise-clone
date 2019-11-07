import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-group-tab',
  templateUrl: './group-tab.component.html',
  styleUrls: ['./group-tab.component.css']
})
export class GroupTabComponent implements OnInit {
  group:any
  constructor(private dataService:DataService,private router:Router) { }

  ngOnInit() {
    this.group=this.dataService.get_groups_data();
  }

  logout(){
    localStorage.removeItem('username');
    this.router.navigate(['/login']);


  }

}
