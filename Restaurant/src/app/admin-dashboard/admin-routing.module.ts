import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { CreateDishComponent } from './Dish/create-dish/create-dish.component';
import { CreatePromotionComponent } from './Promotion/create-promotion/create-promotion.component';
import { CreateLeadershipComponent } from './Leadership/create-leadership/create-leadership.component';





export const routes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [{ 
            path: 'profile', component: ProfileComponent }]
    },
    {
        path: 'admin',
        component: AdminComponent,
        children: [{ path: 'createDish', component: CreateDishComponent }]
    },
    {
        path: 'admin',
        component: AdminComponent,
        children: [{ path: 'createPromotion', component: CreatePromotionComponent }]
    },
    {
        path: 'admin',
        component: AdminComponent,
        children: [{ path: 'createLeadership', component: CreateLeadershipComponent }]
    }
    
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule { }