import { Injectable } from '@angular/core';
import{ Promotion } from '../Shared/promotion'
import{ PROMOTIONS } from '../Shared/promotions'

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions(): Array<Promotion>{
    return PROMOTIONS;
  }
  getPromotion(id : string) : Promotion{
    return PROMOTIONS.filter((promotion) => {
      return promotion.id === id
    })[0];
  }
  getFeatured() : Promotion{
    return PROMOTIONS.filter((promotion) => promotion.featured)[0];
  }
}
