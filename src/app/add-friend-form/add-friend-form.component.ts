import { Component } from '@angular/core';
import { Friend } from '../friend';
import {DataService } from '../data.service';
@Component({
  selector: 'app-add-friend-form',
  templateUrl: './add-friend-form.component.html',
  styleUrls: ['./add-friend-form.component.css']
})
export class AddFriendFormComponent {
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
