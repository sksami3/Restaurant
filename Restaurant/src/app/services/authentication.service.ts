import { Injectable,NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { baseURL } from '../Shared/baseurl';
import { User } from '../Shared/JWTModels/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient,
        private ngZone: NgZone
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        console.log(this.userSubject.value);
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

    logout() {
        if (this.userValue.role == 'Admin') {
            localStorage.removeItem('user');
            this.userSubject.next(null);
            // this.router.navigate(['/login']);
            this.ngZone.run(() => this.router.navigate(['/login']))
        }
        else {
            // remove user from local storage to log user out
            localStorage.removeItem('user');
            this.userSubject.next(null);
            this.router.navigate(['/']);
        }

    }
}