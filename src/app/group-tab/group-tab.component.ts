import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
@Component({
  selector: 'app-group-tab',
  templateUrl: './group-tab.component.html',
  styleUrls: ['./group-tab.component.css']
})
export class GroupTabComponent implements OnInit {
  group:any
  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.group=this.dataService.get_groups_data();
  }

}
