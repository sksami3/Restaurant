import { Component, OnInit, inject, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../Shared/leader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
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
      this.promotionService.getFeatured().then((p) => this.promotion = p, (errorMsg) => this.promotionErrorMessage = errorMsg);
      this.leaderService.getFeatured().subscribe((t) => this.leader = t, (errorMsg) => this.leaderErrorMessage = errorMsg);
      console.log(this.dishErrorMessage);
      console.log(this.promotionErrorMessage);
      console.log(this.leaderErrorMessage);
  }

}
