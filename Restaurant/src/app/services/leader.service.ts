import { Leader } from '../Shared/leader';
import { LEADERS } from '../Shared/leaders';
import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import{delay, catchError, map} from 'rxjs/operators';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import{ProcessHTTPMsgService} from '../services/process-httpmsg.service';
import { baseURL } from '../Shared/baseurl';


@Injectable({
  providedIn: 'root'
})

export class LeaderService {

  constructor(private http: HttpClient, private ProcessHTTPMsgService: ProcessHTTPMsgService) { }

  getLeaders(): Observable<Array<Leader>> {
    return this.http.get<Array<Leader>>(baseURL+'leadership').pipe(catchError(this.ProcessHTTPMsgService.handleError));
  }

  getLeader(id : string): Observable<Leader>{
    return this.http.get<Leader>(baseURL+'leadership/'+id).pipe(catchError(this.ProcessHTTPMsgService.handleError));
  }

  deleteLeader(id : string): Observable<Leader>{
    return this.http.delete<Leader>(baseURL+'leadership/'+id).pipe(catchError(this.ProcessHTTPMsgService.handleError));
  }

  getFeatured(): Observable<Leader>
  {
    return this.http.get<Leader>(baseURL+'leadership?featured=true').pipe(map((leaders) => leaders[0])).pipe(catchError(this.ProcessHTTPMsgService.handleError));
  }

  postLeader(leader : Leader):Observable<Leader>{
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.post<Leader>(baseURL + 'leadership/',leader,httpOptions)
    .pipe(catchError(this.ProcessHTTPMsgService.handleError));
  }
}
