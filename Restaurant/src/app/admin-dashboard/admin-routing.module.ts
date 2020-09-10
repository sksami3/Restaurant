import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { CreateDishComponent } from './Dish/create-dish/create-dish.component';
import { CreatePromotionComponent } from './Promotion/create-promotion/create-promotion.component';
import { CreateLeadershipComponent } from './Leadership/create-leadership/create-leadership.component';
import { ShowDishComponent } from './Dish/show-dish/show-dish.component';
import { ShowPromotionComponent } from './Promotion/show-promotion/show-promotion.component';
import { ShowLeadershipComponent } from './Leadership/show-leadership/show-leadership.component';





export const routes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            { path: '', component: ShowDishComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'createDish', component: CreateDishComponent },
            { path: 'showDishes', component: ShowDishComponent },
            { path: 'createPromotion', component: CreatePromotionComponent },
            { path: 'showPromotions', component: ShowPromotionComponent },
            { path: 'createLeadership', component: CreateLeadershipComponent },
            { path: 'showLeaderships', component: ShowLeadershipComponent }
        ]
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