import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FriendTabComponent } from './friend-tab/friend-tab.component';
import { GroupTabComponent } from './group-tab/group-tab.component';
import { ActivityTabComponent } from './activity-tab/activity-tab.component';
import { SignupComponent } from './signup/signup.component';
import { LoginformComponent } from './loginform/loginform.component';
const routes: Routes = [
  {
<<<<<<< HEAD
  path:'',
  // path:'signup',
  // path:'dashboard/friends'
  //   path:'dashboard'

  component: DashboardComponent
=======
  path:'', component:LoginformComponent
>>>>>>> a790c5fea0830339e34b7b434368d469e70bea40
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
