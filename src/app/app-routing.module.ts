import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FriendTabComponent } from './friend-tab/friend-tab.component';
import { GroupTabComponent } from './group-tab/group-tab.component';
import { ActivityTabComponent } from './activity-tab/activity-tab.component';
import { SignupComponent } from './signup/signup.component';
import { LoginformComponent } from './loginform/loginform.component';
import { AddFriendFormComponent } from './add-friend-form/add-friend-form.component';
import { GroupFormComponent } from './group-form/group-form.component';
import { MemberComponent } from './member/member.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { MemGroupTransComponent } from './mem-group-trans/mem-group-trans.component';
import { TransactiondetailsComponent } from './transactiondetails/transactiondetails.component';
import { InsightsComponent } from './insights/insights.component';
import { ChartComponent } from './chart/chart.component';
import { SettleupComponent } from './settleup/settleup.component';
import { ContributionsComponent } from './contributions/contributions.component';
const routes: Routes = [
  { path:'',redirectTo: '/login', pathMatch:'full'},
  { path:'login',component:LoginformComponent},
  { path:'signup',component:SignupComponent},
  { path :'dashboard',component:DashboardComponent},
  { path:'friend-tab',component:FriendTabComponent},
  { path:'group-tab',component:GroupTabComponent},
  { path:'group-tab/:gid',component:GroupTabComponent},
  { path:'activity-tab',component:ActivityTabComponent},
  { path:'addfriend',component: AddFriendFormComponent},
  { path:'groupform',component:GroupFormComponent},
  { path:'member/:grp',component:MemberComponent},
  { path:'transaction/:grp',component:TransactionsComponent},
  { path:'memgroup',component:MemGroupTransComponent},
  { path:'transdet',component:TransactiondetailsComponent},
  { path:'insight',component:InsightsComponent},
  { path:'chart',component:ChartComponent},
  { path:'settle/:gid',component:SettleupComponent},
  { path:'contri',component:ContributionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
