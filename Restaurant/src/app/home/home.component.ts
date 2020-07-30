import { Component, OnInit, inject, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../Shared/leader';
import { controlInOutWithFlyingAnimation, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations:[
    controlInOutWithFlyingAnimation(),
    expand()
  ]
})
export class HomeComponent implements OnInit {

  dish: Dish;
  dishErrorMessage: string;
  promotionErrorMessage: string;
  leaderErrorMessage: string;
  promotion: Promotion;
  leader: Leader;

  constructor(private promotionService : PromotionService, 
    private dishService : DishService,
    private leaderService : LeaderService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit(): void {
      this.dishService.getFeatured().subscribe((d) => this.dish =  d, (errorMsg) => this.dishErrorMessage = errorMsg);
      this.promotionService.getFeatured().subscribe((p) => this.promotion = p, (errorMsg) => this.promotionErrorMessage = errorMsg);
      this.leaderService.getFeatured().subscribe((l) => this.leader = l, (errorMsg) => this.leaderErrorMessage = errorMsg);
  }

}
