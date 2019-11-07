import { Component, OnInit } from '@angular/core';
import { Login } from '../login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from '../data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent {

  new_entry:any;
  response:any;
  constructor(
    private http:HttpClient,
    private dataService:DataService,
    private router:Router
    ){}

  data = new Login('','');

  onSubmit() {
    // console.log(this.data);
    this.new_entry=this.data;
    this.response=  this.dataService.post_data(this.new_entry)
                      .subscribe(data =>{
                        if(data=="Verified"){
                          localStorage.setItem('username', this.new_entry.userid);
                          // console.log(this.new_entry.userid);
                          this.router.navigate(['/dashboard']);
                          // window.alert("Succesfully Logged In")
                          
                        }else{
                          window.alert("Invalid Password")
                        }
                    },
                    err => {
                      window.alert("Invalid Username")
                    }
                    )
                    }
    // console.log(this.response)
    // if(this.response=="Failed"){
    //   window.alert("Invalid Password!!");
    //   console.log("Hi")
    // }else if(this.response=="Verified"){}
   
  }
  // ngOninit(){
  //   this.dataService.post_data(this.new_entry);
  // }

  // newSignup() {
  //   this.data = new Login('','');
  // }
