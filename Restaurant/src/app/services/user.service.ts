import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { baseURL } from '../Shared/baseurl';
import { User } from '../Shared/JWTModels/user';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${baseURL}/users`);
    }

    getById(id: number) {
        return this.http.get<User>(`${baseURL}/users/${id}`);
    }
}