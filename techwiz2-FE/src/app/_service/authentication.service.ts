import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../_model/User';
import { environment } from '../_model/environment';
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,

  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    console.log(username, password);

    return this.http.post<any>(`http://localhost:8888/api/customer/login`, { username, password })
      .pipe(map(user => {
        
        if (user) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }
  // Login for User
  loginUser(username: string, password: string) {
    var login = {
      "Email": username,
      "password": password
    }
    return this.http.post<any>(environment.apiUrl + 'users/login', login)
      .pipe(map(user => {
        if (user) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}