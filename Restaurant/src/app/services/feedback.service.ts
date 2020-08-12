import { Injectable } from '@angular/core';
import {Feedback} from '../Shared/feedback';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { baseURL } from '../Shared/baseurl';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http : HttpClient, private ProcessHTTPMsgService: ProcessHTTPMsgService) { }

  submitFeedback(feedback : Feedback) : Observable<Feedback> 
  {
    console.log(feedback);
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<Feedback>(baseURL + 'feedback',feedback,httpOptions)
    .pipe(catchError(this.ProcessHTTPMsgService.handleError));
  }

}
