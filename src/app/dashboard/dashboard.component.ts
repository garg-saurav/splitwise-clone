import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  
  
  user:any;
  show=false;name_field=false;password=false;
  constructor(private dataService:DataService,private router:Router) { 
    this.dataService.get_profile_data()
                .subscribe(data => {
                  this.user = data;
                  // this.profile = data;
                  // return this.profile;
                })
    console.log("In dashboard.component.ts",  this.user);
    
    
  }

  selectedFile:File = null;
  user_name:any;new_password:any;
  onFileSelected(event){
    let files = event.target.files;
        //check file is valid
        // if (!this.validateFile(files[0].name)) {
        //     console.log('Selected file format is not supported');
        //     return false;
        // }

        // let fData: FormData = new FormData;

        // for (var i = 0; i < files.length; i++) {
        //     fData.append("file", files[i]);
        // }
        // var _data = {
        //     filename: 'Sample File',
        //     id: '0001'
        // }

        this.selectedFile = <File>event.target.files[0];
        console.log(this.selectedFile);


        // fData.append("data", JSON.stringify(_data));
        
  }
  ChangeName(){
 
this.user_name=(<HTMLInputElement>document.getElementById("txtfield")).value;
console.log("yeahhh",(<HTMLInputElement>document.getElementById("txtfield")).value);
this.name_field=false;
this.dataService.updateName(this.user_name)
          .subscribe(res =>{
            console.log(res);
            this.dataService.get_profile_data()
                .subscribe(data => {
                  this.user = data;
                  console.log(data);
                  window.alert("Name Updated Successfully");
                  // this.profile = data;
                  // return this.profile;
                  // this.router.navigate(['/dashboard']);
                  
                })
                
                
            
          });
  }
  namefield(){
    if(this.name_field==false){
      this.name_field=true;
    }
  else{
  this.name_field=false;
  
}
  }
  passwad(){
    if(this.password==false){
      this.password=true;
    }
  else{
  this.password=false;
  
}
  }

  ChangePassword(){
 
    this.new_password=(<HTMLInputElement>document.getElementById("newpasswd")).value;
    //console.log("yeahhh",(<HTMLInputElement>document.getElementById("txtfield")).value);
    this.password=false;
    this.dataService.updatePassword(this.new_password)
              .subscribe(res =>{
                console.log(res);
                this.dataService.get_profile_data()
                    .subscribe(data => {
                      this.user = data;
                      console.log(data);
                      window.alert("Password changed successfully")
                      // this.profile = data;
                      // return this.profile;
                      // this.router.navigate(['/dashboard']);
                      
                    })
                    
                    
                
              });
      }

  onUpload(){
    this.dataService.uploadProfilePic(this.selectedFile)
          .subscribe(res =>{
            console.log(res);
            this.dataService.get_profile_data()
                .subscribe(data => {
                  this.user = data;
                  console.log(data);
                  // this.profile = data;
                  // return this.profile;
                  // this.router.navigate(['/dashboard']);
                  window.location.reload();
                })
                
                
            
          });
    
  }
  onClick(){
    // this.show=!this.show;
      if(this.show==false){
        this.show=true;
      }
    else{
    this.show=false;
    
  }}
  

  logout(){
    localStorage.removeItem('username');
    this.router.navigate(['/login']);


  }


}
