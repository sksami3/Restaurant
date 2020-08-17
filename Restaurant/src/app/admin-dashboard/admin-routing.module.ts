import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import{ProfileComponent} from './profile/profile.component';
import{AdminComponent} from './admin/admin.component';



export const routes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [{ path: 'profile', component: ProfileComponent }]
    }
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule { }