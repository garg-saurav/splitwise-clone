import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-friend-tab',
  templateUrl: './friend-tab.component.html',
  styleUrls: ['./friend-tab.component.css']
})
export class FriendTabComponent implements OnInit {
  friend:any;
  show=true;
  begin=1;
  detailed_f_name:any;
  all_details:any;
  all_details_keys;

  constructor(private dataService:DataService,private router:Router) { }
  ngOnInit(){
    // this.dataService.get_friends_data()
    //               .subscribe(data => {
    //                 // this.profile = data;
    //                 this.friend=data;
    //                 console.log("sdas");
    //                 console.log(this.friend);
    //               })
    this.dataService.get_friends_details()
                  .subscribe(data => {
                    this.all_details=data;
                    this.all_details_keys=Object.keys(this.all_details);
                    console.log("SDfsdf")
                    console.log(data);
                    this.friend=this.set_friend(data);
                  })
                  
  }

  open_group(g){
    this.router.navigate(['/group-tab/',g]);
    console.log(g);
  }

  set_friend(data){
    var ans=[]
    for(let i in data){
      var temp={}
      console.log(i.substring(i.indexOf(':')+1));
      temp['UserName']=i.substring(0,i.indexOf(':'));
      temp['FriendName']=i.substring(i.indexOf(':')+1);
      var MB=0;
      var ML=0;
      for(let j in data[i]){
        if(data[i][j][0]>0){
          MB=MB+data[i][j][0];
        }else{
          ML=ML+(-1)*data[i][j][0];
        }
      }
      temp['MoneyBorrowed']=MB;
      temp['MoneyGiven']=ML;
      ans.push(temp);
    }
    console.log(ans);
    return ans;
  }


  func(amount){
    if(amount<0){
      return "The person owes you "+((-1)*amount).toString()
    }
    else if(amount>0){
      return "You owe the person "+amount.toString()
    }else{}
  }
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

  allset(map){
    var ans=true;
    for (let k of Object.keys(map)){
      if(map[k][0].toFixed(2)==0.00){
      }else{
        ans=false;
        return false;
      }
    }
    return ans; 
    // return true;
  }

  settleupall(f_name){
    this.dataService.settleupall(f_name)
      .subscribe(data =>{
        console.log(data);
        window.alert(data);
        window.location.reload();
      })
  }
 

  logout(){
    localStorage.removeItem('username');
    this.router.navigate(['/login']);


  }

}
