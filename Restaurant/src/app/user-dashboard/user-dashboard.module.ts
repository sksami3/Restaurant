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
  ],
  entryComponents:[
    //LoginComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
  exports: [
    UserComponent
  ]
})
export class UserDashboardModule { }
