import { Injectable } from '@angular/core';
import { Dish } from '../Shared/dish';
import { DISHES } from '../Shared/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes() : Array<Dish> {
    return DISHES;
  }

  getDish(id : string) : Dish{
    return DISHES.filter(function(dish){
      return dish.id === id
    })[0];
  }

  getFeatured() : Dish{
    return DISHES.find(function(dish){
      return dish.featured == true;
    });
  }
}
