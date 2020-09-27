import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { baseURL,ownUrl } from '../Shared/baseurl';
import { User } from '../Shared/JWTModels/user';

import{ProcessHTTPMsgService} from './process-httpmsg.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient,
        private processHTTPMsgService: ProcessHTTPMsgService
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(username: string, password: string) {

        return this.http.post<any>(`${baseURL}users/authenticate`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    loginByEmail(email: string) {
        console.log(email);
        const httpOptions = {
            headers : new HttpHeaders({
              'Content-Type':  'application/json'
            })
          };

        return this.http.post<any>(`${baseURL}users/GetByEmail?email=`+ email,httpOptions)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        if (this.userValue.role == 'Admin') {
            localStorage.removeItem('user');
            this.userSubject.next(null);
            // this.router.navigate(['/login']);
            this.router.navigate(['/login']);
        }
        else {
            // remove user from local storage to log user out
            localStorage.removeItem('user');
            this.userSubject.next(null);
            this.router.navigate(['/']);
        }

    }

    sendResetLink(email: string,token: string) : Observable<boolean> {
        console.log(token);
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        return this.http.post<boolean>(`${baseURL}users/SendResetLink`, { email,token }, httpOptions)
            .pipe(catchError(this.processHTTPMsgService.handleError));
    }
}