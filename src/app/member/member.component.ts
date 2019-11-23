import { Component } from '@angular/core';
import { Friend } from '../friend';
import {DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent  {
  
  constructor(
    private dataService:DataService,
    private route: ActivatedRoute,
    private router: Router
  ){}
  
  model=new Friend('');
  submitted=false;
  grp_id:any;

  onSubmit(){
    this.dataService.add_group_member(this.grp_id,this.model)
        .subscribe(data =>{
          window.alert(data);
          this.router.navigate(['/group-tab']);
        })
  }

  newFriend(){
    this.model=new Friend('');
  }

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      // console.log();
      this.grp_id=params['params']['grp'];
    });
  }



}
