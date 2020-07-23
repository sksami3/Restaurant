import { Injectable } from '@angular/core';
import{ Promotion } from '../Shared/promotion'
import{ PROMOTIONS } from '../Shared/promotions'

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions(): Promise<Array<Promotion>>{
    //return Promise.resolve(PROMOTIONS);
    return new Promise(function(resolve,reject){
      setTimeout(function(){
        return resolve(PROMOTIONS);
      })
    })
  }
  getPromotion(id : string) : Promise<Promotion>{
    // return Promise.resolve(PROMOTIONS.filter((promotion) => {
    //   return promotion.id === id
    // })[0]);
    return new Promise((resolve) => {
      setTimeout(() => resolve(PROMOTIONS.filter((promotion) => 
        promotion.id === id
        )[0]),3000);
    })
  }
  getFeatured() : Promise<Promotion>{
    //return Promise.resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]);
    return new Promise((resolve) => setTimeout(() => resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]),2000));
  }
}
