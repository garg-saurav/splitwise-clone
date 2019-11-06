import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FriendTabComponent } from './friend-tab/friend-tab.component';
import { GroupTabComponent } from './group-tab/group-tab.component';
import { ActivityTabComponent } from './activity-tab/activity-tab.component';
import { SignupComponent } from './signup/signup.component';
import { LoginformComponent } from './loginform/loginform.component';
const routes: Routes = [
  { path:'',redirectTo: '/login', pathMatch:'full'},
  { path:'login',component:LoginformComponent},
  { path:'signup',component:LoginformComponent},
  { path :'dashboard',component:DashboardComponent},
  { path:'friend-tab',component:FriendTabComponent},
  { path:'group-tab',component:GroupTabComponent},
  { path:'activity-tab',component:ActivityTabComponent}
  // path:'signup',
  // path:'dashboard/friends'
  //   path:'dashboard'

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
