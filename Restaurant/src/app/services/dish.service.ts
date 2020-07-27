import { Injectable, Inject } from '@angular/core';
import { Dish } from '../Shared/dish';
import { Observable,of, pipe } from 'rxjs';
import{delay, map} from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import {baseURL} from '../Shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class DishService 
{

  constructor(private http : HttpClient) { }

  getDishes() : Observable<Array<Dish>> {
    return this.http.get<Array<Dish>>(baseURL+'dishes');
  }

  getDish(id : string) : Observable<Dish>{
    return this.http.get<Dish>(baseURL+'dishes/' +id);
  }

  getFeatured() : Observable<Dish>{
    return this.http.get<Dish>(baseURL+'dishes?featured=true').pipe(map(dishes => dishes[0]));
  }

  getDishIds(): Observable<Array<string>>
  {
    return this.http.get<Array<Dish>>(baseURL+'dishes').pipe(map(function(dishes){
      return dishes.map(function(dish){
        return dish.id;
      })
    }));
  }

}
