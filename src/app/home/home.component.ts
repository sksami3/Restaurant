import { Component, OnInit } from '@angular/core';
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
  promotion: Promotion;
  leader: Leader;

  constructor(private promotionService : PromotionService, 
    private dishService : DishService,
    private leaderService : LeaderService) { }

  ngOnInit(): void {
      this.dishService.getFeatured().then((d) => this.dish =  d);
      this.promotionService.getFeatured().then((p) => this.promotion = p);
      this.leaderService.getFeatured().then((t) => this.leader = t);
      console.log(this.leader);
  }

}
