import { Component } from '@angular/core';
import { Friend } from '../friend';
import {DataService } from '../data.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-add-friend-form',
  templateUrl: './add-friend-form.component.html',
  styleUrls: ['./add-friend-form.component.css']
})
export class AddFriendFormComponent {
  constructor(
    private dataService:DataService,
    private router:Router
  ){}
  model=new Friend('');
  submitted=false;
  onSubmit(){
    this.dataService.get_req_add_friend(this.model.userid)
      .subscribe(data=>{
        window.alert(data);
        this.router.navigate(['/friend-tab']);
      })
  }

  newFriend(){
    this.model=new Friend('');
  }
 

}
