import { Component } from '@angular/core';

import { Signup }    from '../signup';
import {DataService } from '../data.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(
    private dataService:DataService
  ){}

  model = new Signup('', '', '');

  submitted = false;

  onSubmit() { console.log(this.model); this.dataService.post_data_register_user(this.model);}

  newSignup() {
    this.model = new Signup('','', '');
  }
}
