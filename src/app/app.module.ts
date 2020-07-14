import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MenuComponent } from './menu/menu.component';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list'; 
import { MatCardModule } from '@angular/material/card';  
import { MatButtonModule } from '@angular/material/button'; 
import 'hammerjs';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { DishService } from './services/dish.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AppRoutingModule } from './app-routing/app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    HomeComponent,
    ContactComponent   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    AppRoutingModule
  ],
  providers: [
    DishService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
