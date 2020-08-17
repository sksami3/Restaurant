import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import{AdminRoutingModule} from './admin-routing.module'



@NgModule({
  declarations: [ProfileComponent, AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminDashboardModule { }
