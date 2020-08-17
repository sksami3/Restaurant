import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { UserRoutingModule } from './user-dashboard/user-routing.module';
import { PromotionService } from './services/promotion.service'
import { LeaderService } from './services/leader.service';


import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import {baseURL} from './Shared/baseurl';
import {ProcessHTTPMsgService} from './services/process-httpmsg.service';
import { DishService } from './services/dish.service';

import {FeedbackService} from './services/feedback.service';
import {AdminDashboardModule} from './admin-dashboard/admin-dashboard.module';
import {UserDashboardModule} from './user-dashboard/user-dashboard.module';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    UserRoutingModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
    ,HttpClientModule
    ,AdminDashboardModule//new module
    ,UserDashboardModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    DishService,
    PromotionService,
    LeaderService,
    ProcessHTTPMsgService,
    FeedbackService,
    {provide: 'BaseURL', useValue: baseURL}
  ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
