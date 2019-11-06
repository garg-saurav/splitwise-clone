import { Component, OnInit } from '@angular/core';
import { Login } from '../login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from '../data.service';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent {

  new_entry:any;

  constructor(
    private http:HttpClient,
    private dataService:DataService
    ){}

  data = new Login('','');

  onSubmit() {
    console.log(this.data);
    this.new_entry=this.data;
    this.dataService.post_data(this.new_entry);
  }

  // ngOninit(){
  //   this.dataService.post_data(this.new_entry);
  // }

  // newSignup() {
  //   this.data = new Login('','');
  // }

}
