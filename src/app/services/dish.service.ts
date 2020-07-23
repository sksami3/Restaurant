import { Injectable } from '@angular/core';
import { Dish } from '../Shared/dish';
import { DISHES } from '../Shared/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes() : Promise<Array<Dish>> {
    return Promise.resolve(DISHES);
  }

  getDish(id : string) : Promise<Dish>{
    return Promise.resolve(DISHES.filter(function(dish){
      return dish.id === id
    })[0]);
  }

  getFeatured() : Promise<Dish>{
    return Promise.resolve(DISHES.find(function(dish){
      return dish.featured == true;
    }));
  }
}
