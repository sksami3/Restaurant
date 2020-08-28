import { Injectable } from '@angular/core';
import{ NbMenuItem } from '../Shared/menu'
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http'
import { baseURL } from '../Shared/baseurl';
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient, private ProcessHTTPMsgService: ProcessHTTPMsgService) { }

  getMenus(): Observable<Array<NbMenuItem>> {
    return this.http.get<Array<NbMenuItem>>(baseURL+'menus').pipe(catchError(this.ProcessHTTPMsgService.handleError));
  }
}
