import { NgModule } from '@angular/core';
// import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FriendTabComponent } from './friend-tab/friend-tab.component';
import { GroupTabComponent } from './group-tab/group-tab.component';
import { ActivityTabComponent } from './activity-tab/activity-tab.component';
import { SignupComponent } from './signup/signup.component';
import { LoginformComponent } from './loginform/loginform.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AddFriendFormComponent } from './add-friend-form/add-friend-form.component';
import { GroupFormComponent } from './group-form/group-form.component';
import { MemberComponent } from './member/member.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { MemGroupTransComponent } from './mem-group-trans/mem-group-trans.component';
import { TransactiondetailsComponent } from './transactiondetails/transactiondetails.component';
import { InsightsComponent } from './insights/insights.component';
import { ChartComponent } from './chart/chart.component';
import { BrowserModule } from '@angular/platform-browser';
import { SettleupComponent } from './settleup/settleup.component';
import { ContributionsComponent } from './contributions/contributions.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FriendTabComponent,
    GroupTabComponent,
    ActivityTabComponent,
    SignupComponent,
    LoginformComponent,
    AddFriendFormComponent,
    GroupFormComponent,
    MemberComponent,
    TransactionsComponent,
    MemGroupTransComponent,
    TransactiondetailsComponent,
    InsightsComponent,
    ChartComponent,
    SettleupComponent,
    ContributionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
