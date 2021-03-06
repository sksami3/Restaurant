import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';

import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'; 

import {MatFormFieldModule} from '@angular/material/form-field'; 
import { FormsModule }   from '@angular/forms';
import {MatInputModule} from '@angular/material/input'; 
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import { ReactiveFormsModule } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import {MatSliderModule} from '@angular/material/slider'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list'; 
import { MatCardModule } from '@angular/material/card';  
import { MatButtonModule } from '@angular/material/button'; 
import {MatIconModule} from '@angular/material/icon'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { FileUploadModule } from 'ng2-file-upload';
import 'hammerjs';
import { UserComponent } from './user/user.component';
import { UserRoutingModule } from './user-routing.module';

import { HighliteDirective } from '../directives/highlite.directive';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AccountHeaderComponent } from './account-header/account-header.component';
import { AgmCoreModule } from '@agm/core';
import {MatPaginatorModule} from '@angular/material/paginator'; 
import { ToastrModule } from 'ngx-toastr';
import { ForgetPasswordComponent } from './forget-password/forget-password/forget-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  AmazonLoginProvider,
} from 'angularx-social-login';


@NgModule({
  declarations: [
    MenuComponent,
    DishdetailComponent,
    
    FooterComponent,
    AboutComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent,
    HeaderComponent,
    UserComponent,
    HighliteDirective,
    UserProfileComponent,
    AccountHeaderComponent,
    ForgetPasswordComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule
    ,MatSlideToggleModule,
    MatSelectModule
    ,MatProgressSpinnerModule
    ,MatSliderModule
    ,MatMenuModule
    ,MatIconModule
    ,UserRoutingModule
    ,FileUploadModule
    ,AgmCoreModule.forRoot({
      apiKey: ''
    }),
    MatPaginatorModule,
    ToastrModule.forRoot(),
    SocialLoginModule
  ],
  entryComponents:[
    //LoginComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '68046549740-5elppbipj7atgv0pv50ocvclhv705r09.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('251763382835618'),
          },
          {
            id: AmazonLoginProvider.PROVIDER_ID,
            provider: new AmazonLoginProvider(
              'clientId'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    }
  ],
  exports: [
    UserComponent
  ]
})
export class UserDashboardModule { }
