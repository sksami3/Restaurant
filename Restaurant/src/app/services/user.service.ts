import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { baseURL } from '../Shared/baseurl';
import { User } from '../Shared/JWTModels/user';
import { Observable } from 'rxjs';
import{delay, catchError, map} from 'rxjs/operators';
import{ProcessHTTPMsgService} from '../services/process-httpmsg.service';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient,private ProcessHTTPMsgService: ProcessHTTPMsgService) { }

    getAll() {
        return this.http.get<User[]>(`${baseURL}`+"users");
    }

    getById(id: number) {
        return this.http.get<User>(`${baseURL}`+"users/"+id);
    }

    create(user: User) {
        console.log(user);
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post<User>(baseURL + 'users', user, httpOptions)
            .pipe(catchError(this.ProcessHTTPMsgService.handleError));
    }
    uploadImage(formData:any){
        // const httpOptions = {
        //     headers: new HttpHeaders({
        //         'Content-Type': 'application/json'
        //     })
        // };
        return this.http.post(baseURL + 'users/profilepictureuploader', formData, { responseType: 'text'})
            .pipe(catchError(this.ProcessHTTPMsgService.handleError));
    }
}