import { Component } from '@angular/core';
import { Friend } from '../friend';
import {DataService } from '../data.service';
@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent  {
  
  constructor(
    private dataService:DataService
  ){}
  model=new Friend('');
  submitted=false;
  onSubmit(){console.log(this.model);this.submitted=true;}
  newFriend(){
    this.model=new Friend('');
  }



}
