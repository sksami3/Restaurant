import { Injectable } from '@angular/core';
import{ Promotion } from '../Shared/promotion'
import{ PROMOTIONS } from '../Shared/promotions'

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions(): Promise<Array<Promotion>>{
    return Promise.resolve(PROMOTIONS);
  }
  getPromotion(id : string) : Promise<Promotion>{
    return Promise.resolve(PROMOTIONS.filter((promotion) => {
      return promotion.id === id
    })[0]);
  }
  getFeatured() : Promise<Promotion>{
    return Promise.resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]);
  }
}
