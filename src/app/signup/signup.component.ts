import { Component } from '@angular/core';

import { Signup }    from '../signup';
import {DataService } from '../data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(
    private dataService:DataService,
    private router:Router
  ){}

  model = new Signup('', '', '');

  submitted = false;

  onSubmit() {
     this.dataService.post_data_register_user(this.model)
          .subscribe(data =>{
            if(data=="Username Already Exists"){
              window.alert(data);
            }else if(data=="Successfully added"){
              // console.log("df");
              window.alert("Successfully added!! Please login to continue");
              this.router.navigate(['/login']);
            }else{
              console.log(data);
            }
          })
  }

  newSignup() {
    this.model = new Signup('','', '');
  }
}
