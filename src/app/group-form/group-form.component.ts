import { Component } from '@angular/core';
import { Group } from '../group';
import {DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css']
})
export class GroupFormComponent  {

  constructor(
    private dataService:DataService,
    private router:Router
  ){}
  model=new Group('');
  submitted=false;
  onSubmit(){

    this.dataService.add_group(this.model)
          .subscribe(res =>{
            console.log(res);
      console.log(this.model);this.submitted=true;
      this.router.navigate(['/group-tab']);
    })

  }

 
  newGroup(){
    this.model=new Group('');}
  }