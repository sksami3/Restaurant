import { Injectable } from '@angular/core';
import{ Promotion } from '../Shared/promotion'
import{ PROMOTIONS } from '../Shared/promotions'
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { baseURL } from '../Shared/baseurl';
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http:HttpClient, private ProcessHTTPMsgService: ProcessHTTPMsgService) { }

  getPromotions(): Observable<Array<Promotion>>{
    return this.http.get<Array<Promotion>>(baseURL+'promotions').pipe(catchError(this.ProcessHTTPMsgService.handleError));
  }
  getPromotion(id : string) : Observable<Promotion>{
    return this.http.get<Promotion>(baseURL+'promotions/'+id).pipe(catchError(this.ProcessHTTPMsgService.handleError));
  }
  deletePromotion(id : string) : Observable<Promotion>{
    return this.http.delete<Promotion>(baseURL+'promotions/'+id).pipe(catchError(this.ProcessHTTPMsgService.handleError));
  }
  getFeatured() : Observable<Promotion>{
    return this.http.get<Promotion>(baseURL+'promotions?featured=true')
    .pipe(map((promotions) => promotions[0])).pipe(catchError(this.ProcessHTTPMsgService.handleError));
  }

  postPromotion(promotion : Promotion):Observable<Promotion>{
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.post<Promotion>(baseURL + 'promotions/',promotion,httpOptions)
    .pipe(catchError(this.ProcessHTTPMsgService.handleError));
  }
}
