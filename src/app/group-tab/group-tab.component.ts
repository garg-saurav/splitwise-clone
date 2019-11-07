import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
// import * as $ from 'jquery';
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
  
//   addInput(): void
// { 
// document.getElementById('responce').innerHTML+='<br/><input type="text" id="boxName" value="Enter group name" "  /><br/>';
     
// }

  logout(){
    localStorage.removeItem('username');
    this.router.navigate(['/login']);


  }

}
