import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
// import * as $ from 'jquery';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-group-tab',
  templateUrl: './group-tab.component.html',
  styleUrls: ['./group-tab.component.css']
})
export class GroupTabComponent implements OnInit {
  group:any;
  members:any;groupbalance:any;groupbalance2:any; transactions:any;
  constructor(private dataService:DataService,private router:Router,private route:ActivatedRoute) { }
  show=true;
  showbalance=true;
  begin=1;
  detailed_f_name:any;
  f_name:any;
  all_details:any;keys:any;
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
    this.route.paramMap.subscribe(params => {
      // console.log();
        if(params['params']['gid']){
          console.log(params['params']['gid']);
          this.onClick(params['params']['gid']);
          // window.location.hash = "params['params']['gid']";
  
        };
    });

    // this.route.paramMap.subscribe
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
  this.dataService.grouptransactions(f[0])
        .subscribe(data =>{
          this.transactions =data;
          // console.log(data);
          // this.keys=Object.keys(this.transactions["0"]); 
          console.log("hereeee",this.transactions);
          // console.log("heyyy",this.groupbalance);
        })
  
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
  this.dataService.getbalances(f[0])
        .subscribe(data =>{
          this.groupbalance =data;
          console.log(data);
          this.keys=Object.keys(this.groupbalance["0"]); 
          console.log("hereeee",this.keys);
          console.log("heyyy",this.groupbalance);
        })
        
        
        
  this.dataService.getbalances2(f[0])
  .subscribe(data =>{
    this.groupbalance2 =data;
    console.log(data);
  })
        
}
  console.log(f);
}
func(amount){
  if(amount==0){
    return "You are settled up in the group"
  }
  else if(amount>0){
    return "The group owes you "+(amount).toString()
  }
  else{
    return "You owe the group "+((-1)*amount).toString()
  }
}
func1(amount,friend){
  if(amount==0){
    return "You are settled up with "+friend
  }
  else if(amount<0){
    return friend+" owes you "+((-1)*amount).toString()
  }
  else{
    return "You owe "+friend+amount.toString()
  }
}
func2(amount){
  if(amount==0){
    return "Settled up with the group"
  }
  else if(amount<0){
    return "Will get from the group "+((-1)*amount).toString()
  }
  else{
    return "Owes to the group "+amount.toString()
  }
}
  logout(){
    localStorage.removeItem('username');
    this.router.navigate(['/login']);


  }
  value(r){
    return parseFloat(r).toFixed(2);
  }

  settle(gid){
    this.router.navigate(['/settle/'+gid]);
  }

  leave(gid){
    console.log("GID",gid);
    this.dataService.leave(gid)
      .subscribe(data => {
        console.log(data);
        if(data=="Left Group"){
          window.location.reload();
        }else{
          window.alert(data);
        }
      })
  }






}
