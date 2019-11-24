import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-settleup',
  templateUrl: './settleup.component.html',
  styleUrls: ['./settleup.component.css']
})
export class SettleupComponent{

  form:FormGroup;
  members:any;
  gid:any;
  ordersData=[];
  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private dataService: DataService,
    
  ) {
    this.form = this.formBuilder.group({
      orders: new FormArray([], minSelectedCheckboxes(1))
    });

    // async orders
    }

  private addCheckboxes() {
    this.ordersData.forEach((o, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      (this.form.controls.orders as FormArray).push(control);
    });
  }
  getOrders() {

    this.dataService.get_group_members()
      .subscribe(data =>{
        this.members =data;
        console.log("MEMBERS");
        console.log(data);
        var ans=[]
        for( let i in data){
          var temp={}
          if(data[i][0]==this.gid && data[i][3]!=0){
              temp['id']=data[i][1];
              temp['name']=data[i][2];
              console.log(data[i][2]);
              ans.push(temp);
          }
        }
        console.log("ANS",ans)
        this.ordersData = ans;
        this.addCheckboxes();
        // return ans;
      })
    // return [
    //   { id: 100, name: 'order 1' },
    //   { id: 200, name: 'order 2' },
    //   { id: 300, name: 'order 3' },
    //   { id: 400, name: 'order 4' }
    // ];
  }

  submit() {
    const selectedOrderIds = this.form.value.orders
      .map((v, i) => v ? this.ordersData[i].id : null)
      .filter(v => v !== null);
    var fd = new FormData;
    fd.append('grp_id',this.gid);
    fd.append('friends',selectedOrderIds);
    this.dataService.settleup(fd)
      .subscribe (data=>{
        console.log(data);
        window.alert(data);
        this.router.navigate(['/group-tab']);
      })
    // console.log(selectedOrderIds);
  }

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe(params => {
      this.gid = params['params']['gid'];
      this.getOrders();
    })

    }
      // .subscribe
    
      // this.route.paramMap.subscribe(params => {
      //   // console.log();
      //   this.grp_id=params['params']['grp'];
      // });
  
    }


function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      .map(control => control.value)
      .reduce((prev, next) => next ? prev + next : prev, 0);

    return totalSelected >= min ? null : { required: true };
  };

  

  return validator;
}

