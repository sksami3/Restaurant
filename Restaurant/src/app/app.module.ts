import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatDialogModule, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'; 

import { AppRoutingModule } from './app-routing/app-routing.module';
import { UserRoutingModule } from './user-dashboard/user-routing.module';
import { PromotionService } from './services/promotion.service'
import { LeaderService } from './services/leader.service';


import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { baseURL } from './Shared/baseurl';
import { ProcessHTTPMsgService } from './services/process-httpmsg.service';
import { DishService } from './services/dish.service';
import { TosterService } from './services/toster.service';

import { FeedbackService } from './services/feedback.service';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';
import { UserDashboardModule } from './user-dashboard/user-dashboard.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {JwtInterceptor} from './helper/jwt.interceptor';
import {ErrorInterceptor} from './helper/error.interceptor';
//import { LoginComponent } from './user-dashboard/login/login.component';

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
    , HttpClientModule
    , AdminDashboardModule//new module
    , UserDashboardModule
    ,MatDialogModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    DishService,
    PromotionService,
    LeaderService,
    ProcessHTTPMsgService,
    FeedbackService,
    TosterService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: 'BaseURL', useValue: baseURL },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
  entryComponents:[
    //LoginComponent
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
