import { Component } from '@angular/core';
import { Group } from '../group';
import {DataService } from '../data.service';
@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css']
})
export class GroupFormComponent  {

  constructor(
    private dataService:DataService
  ){}
  model=new Group('');
  submitted=false;
  onSubmit(){console.log(this.model);this.submitted=true;}
  newGroup(){
    this.model=new Group('');}
}
