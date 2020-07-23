import { Injectable } from '@angular/core';
import { Dish } from '../Shared/dish';
import { DISHES } from '../Shared/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService 
{

  constructor() { }

  getDishes() : Promise<Array<Dish>> {
    // return Promise.resolve(DISHES);
    return new Promise(function(res, rej) {
      return setTimeout(() => res(DISHES),5000);
    })
  }

  getDish(id : string) : Promise<Dish>{
    // return Promise.resolve(DISHES.filter(function(dish){
    //   return dish.id === id
    // })[0]);
    return new Promise(function(res,rej){
      return setTimeout(() => res(DISHES.filter(function(dish){
        return dish.id === id;
        })[0]),3000)
    })
  }

  getFeatured() : Promise<Dish>{
    // return Promise.resolve(DISHES.find(function(dish){
    //   return dish.featured == true;
    // }));
    return new Promise(function(res,rej){
      return setTimeout(function() {
        res(DISHES.find(function(dish){
          return dish.featured === true;
        }))
      },2500)
    })
  }

}
