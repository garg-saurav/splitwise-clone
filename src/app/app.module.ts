import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
<<<<<<< HEAD
import { FriendTabComponent } from './friend-tab/friend-tab.component';
import { GroupTabComponent } from './group-tab/group-tab.component';
import { ActivityTabComponent } from './activity-tab/activity-tab.component';
=======
>>>>>>> 62c8b278fdc0df1203d385b917a1b6f4d449bb63

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    DashboardComponent,
    FriendTabComponent,
    GroupTabComponent,
    ActivityTabComponent
=======
    DashboardComponent
>>>>>>> 62c8b278fdc0df1203d385b917a1b6f4d449bb63
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
