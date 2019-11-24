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
  group:any;
  members:any;
  constructor(private dataService:DataService,private router:Router) { }
  show=true;
  begin=1;
  detailed_f_name:any;
  all_details:any;
  ngOnInit() {
    this.dataService.get_groups_data()
                  .subscribe(data => {
                    this.group = data;
                    console.log("asdf",data);
                  });
    this.dataService.get_group_members()
        .subscribe(data =>{
          this.members =data;
          console.log("MEMBERS");
          console.log(data);
        })
  }
  
//   addInput(): void
// { 
// document.getElementById('responce').innerHTML+='<br/><input type="text" id="boxName" value="Enter group name" "  /><br/>';
     
// }
onClick(f){
  // this.show=!this.show;
  if(f.UserName == this.detailed_f_name){
    this.show=!this.show;
    if(this.show==false){
      this.detailed_f_name=null;
      this.show=true;
    }
  }else{
  this.detailed_f_name=f.UserName;
  
}
  console.log(f);
}
  logout(){
    localStorage.removeItem('username');
    this.router.navigate(['/login']);


  }

}
