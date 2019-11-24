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
  showbalance=true;
  begin=1;
  detailed_f_name:any;
  f_name:any;
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
  if(f[0] == this.detailed_f_name){
    this.show=!this.show;
    if(this.show==false){
      this.detailed_f_name=null;
      this.show=true;
    }
  }else{
  this.detailed_f_name=f[0];
  this.f_name=null;
  this.showbalance=true;
  
}
  console.log(f);
}
onClickbalance(f){
  // this.show=!this.show;
  if(f[0] == this.f_name){
    this.showbalance=!this.showbalance;
    if(this.show==false){
      this.f_name=null;
      this.showbalance=true;
    }
  }else{
  this.f_name=f[0];
  
}
  console.log(f);
}
  logout(){
    localStorage.removeItem('username');
    this.router.navigate(['/login']);


  }

}
