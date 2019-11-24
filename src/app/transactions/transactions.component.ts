import { Component } from '@angular/core';
import { Transaction } from '../transaction';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent {

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  grp_id:any;
  members_details:any;
  all_friends:any;
  dist={}
  name={}
  user:any;
  cnt:any;
  last:any;

  tags=['movies','food','housing','travel','others'];
  model=new Transaction('','',0,'');
  submitted=false;
  
  onsubmit(){

    this.dist[this.user.id]=(<HTMLInputElement>document.getElementById(this.user.id)).value;
    this.name[this.user.id]=this.user.user;
    for (let sh of this.all_friends){
      console.log("Here",sh[1]);
      if(sh[0]==this.grp_id){
        this.dist[sh[1]]=(<HTMLInputElement>document.getElementById(sh[1])).value;
        this.name[sh[1]]=sh[2];
        console.log((<HTMLInputElement>document.getElementById(sh[1])).value);
        

      }
    }
      var sum=0;
      // sum=sum+parseFloat(this.dist[this.user.id]);
      for(let sh in this.dist){
        sum=sum+parseFloat(this.dist[sh]);
        console.log(sum);
      }
      var invalid=false;
      if(sum!=100.00){
        
            window.alert("Sum of input percentage is not 100");
            invalid=true;
          // console.log(sum);
        }else{

              for(let sh in this.dist){
                if(parseFloat(this.dist[sh])<0){
                  window.alert("Invalid input");
                  invalid=true;
                }
              
              
            }
          }
          if(!invalid){
            var fd=new FormData();
            // console.log('_grp_id',this.grp_id)
            fd.set('_grp_id',this.grp_id);
            fd.set('_desc',this.model.desc);
            var total=this.model.amount;
            fd.set('_tag',this.model.tag);
            for(let sh in this.dist){
              // if(parseFloat(this.dist[sh])<0){
                // fd.append(sh,this.dist[sh]);
              // }
              if(sh!= this.user.id){
                fd.set('_amt',parseFloat((total*(this.dist[sh])/100).toString()).toFixed(2));
                console.log(sh)
                fd.set('_borrower',sh)
              }
              this.dataService.add_trans(fd)
                .subscribe(data =>{
                  console.log(data);
                  
              })



            }
            this.router.navigate(['/group-tab'])
             
          //   for (var key of fd.entries()) {
          //     console.log(key[0] + ', ' + key[1]);
          // }
          
          // this.submitted=false; 
        }
  
  }
  newTransaction(){
    this.model=new Transaction('','',0,'');
  }


  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      // console.log();
      this.grp_id=params['params']['grp'];})
      console.log(this.grp_id);
    
      this.dataService.get_group_members()
        .subscribe(data => {
          var count=1;
          this.all_friends=data;
          for (let sh of this.all_friends){
            console.log("Here",sh[1]);
            if(sh[0]==this.grp_id){
              count++;
            }
        }
        this.cnt=count;
        this.last=100-(count-1)*parseFloat((100/count).toFixed(2));
        // for (let sh of this.all_friends){
        //   console.log("Here",sh[1]);
        //   (<HTMLInputElement>document.getElementById(sh[1])).value=(100/count).toFixed(2);
        // }

    });

    this.dataService.get_profile_data()
                .subscribe(data => {
                  this.user = data;
                  // this.profile = data;
                  // return this.profile;
                })
  }

  

}
