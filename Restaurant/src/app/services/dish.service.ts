import { Injectable, Inject } from '@angular/core';
import { Dish } from '../Shared/dish';
import { Comment } from '../Shared/comment';
import { Observable,of, pipe } from 'rxjs';
import{delay, map, catchError} from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {baseURL} from '../Shared/baseurl';
import{ProcessHTTPMsgService} from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class DishService 
{

  constructor(private http : HttpClient, private processHTTPMsgService:ProcessHTTPMsgService) { }

  getDishes() : Observable<Array<Dish>> {
    return this.http.get<Array<Dish>>(baseURL+'dishes').pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDish(id : string) : Observable<Dish>{
    return this.http.get<Dish>(baseURL+'dishes/' +id).pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeatured() : Observable<Dish>{
    return this.http.get<Dish>(baseURL+'dishes?featured=true').pipe(map(dishes => dishes[0])).pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDishIds(): Observable<Array<string>>
  {
    return this.http.get<Array<Dish>>(baseURL+'dishes').pipe(map(function(dishes){
      return dishes.map(function(dish){
        return dish.id;
      })
    })).pipe(catchError(this.processHTTPMsgService.handleError));;
  }

  putDishe(dish : Dish):Observable<Dish>{
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.put<Dish>(baseURL + 'dishes/' + dish.id,dish,httpOptions)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  //move this to comment service when created
  postComment(comment : Comment):Observable<Comment>{
    console.log(comment);
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.post<Comment>(baseURL + 'comments' , comment,httpOptions)
    .pipe(catchError(this.processHTTPMsgService.handleError));
    
  }

}
