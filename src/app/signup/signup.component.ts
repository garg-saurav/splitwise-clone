import { Component } from '@angular/core';

import { Signup }    from '../signup';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {


  model = new Signup('', '', '');

  submitted = false;

  onSubmit() { console.log(this.model); }

  newSignup() {
    this.model = new Signup('','', '');
  }
}
