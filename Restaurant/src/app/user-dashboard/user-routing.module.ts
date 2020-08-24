import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from '../user-dashboard/about/about.component';
import { HomeComponent } from '../user-dashboard/home/home.component';
import { ContactComponent } from '../user-dashboard/contact/contact.component';
import { MenuComponent } from '../user-dashboard/menu/menu.component';
import { DishdetailComponent } from '../user-dashboard/dishdetail/dishdetail.component';
import { UserComponent } from '../user-dashboard/user/user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';



export const routes: Routes = [
    {
        path: 'home',
        component: UserComponent,
        children: [{ path: '', component: HomeComponent }]
    },
    {
        path: 'about',
        component: UserComponent,
        children: [{ path: '', component: AboutComponent }]
    },
    {
        path: 'contact', component: UserComponent,
        children: [{ path: '', component: ContactComponent }]
    },
    {
        path: 'menu', component: UserComponent,
        children: [{ path: '', component: MenuComponent }]
    },
    {
        path: 'dishDetail/:id', component: UserComponent,
        children: [{ path: '', component: DishdetailComponent }]
    },
    {
        path: 'createProfile', component: UserComponent,
        children: [{ path: '', component: UserProfileComponent }]
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
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
export class UserRoutingModule { }