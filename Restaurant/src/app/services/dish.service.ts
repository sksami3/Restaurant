import { Injectable } from '@angular/core';
import { Dish } from '../Shared/dish';
import { DISHES } from '../Shared/dishes';
import { Observable,of } from 'rxjs';
import{delay} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DishService 
{

  constructor() { }

  getDishes() : Observable<Array<Dish>> {
    // return Promise.resolve(DISHES);

    // return new Promise(function(res, rej) {
    //   return setTimeout(() => res(DISHES),5000);
    // })

    return of(DISHES).pipe(delay(5000));
  }

  getDish(id : string) : Observable<Dish>{
    // return Promise.resolve(DISHES.filter(function(dish){
    //   return dish.id === id
    // })[0]);

    // return new Promise(function(res,rej){
    //   return setTimeout(() => res(DISHES.filter(function(dish){
    //     return dish.id === id;
    //     })[0]),3000)
    // })

    return of(DISHES.filter((dish) => dish.id === id)[0]).pipe(delay(3000));
  }

  getFeatured() : Observable<Dish>{
    // return Promise.resolve(DISHES.find(function(dish){
    //   return dish.featured == true;
    // }));

    // return new Promise(function(res,rej){
    //   return setTimeout(function() {
    //     res(DISHES.find(function(dish){
    //       return dish.featured === true;
    //     }))
    //   },2500)
    // })

    return of(DISHES.find((dish) => dish.featured)).pipe(delay(2500));
  }

  getDishIds(): Observable<Array<string> | any>
  {
    return of(DISHES.map((dish) => dish.id));
  }

}
