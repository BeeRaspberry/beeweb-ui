import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, throwError } from 'rxjs';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map, first } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';

import { User } from '../../../models';
import { ILoginUser, LoginUserResponse } from './interfaces';
import { AppConfigService } from '../../../core/services/app-config.service';
import { LOGIN_USER } from './queries';

@Injectable({
  providedIn: 'root'
})

export class UserSessionService {
    private currentUserSubject: BehaviorSubject<ILoginUser>;
    error_message = new BehaviorSubject<string>(null);

  constructor(
    private http: HttpClient,
    private apollo: Apollo,
    private configService: AppConfigService
  ) {
    this.currentUserSubject = new BehaviorSubject<ILoginUser>(localStorage.currentUser);
//    this.currentUser = this.currentUserSubject.asObservable();
  }

  getLoggedIn(): boolean {
    const storage = localStorage.getItem('currentUser');
    if (storage) {
      const temp = JSON.parse(storage);
      if (temp && 'accessToken' in temp) {
        return true;
      }
    }
    return false;
  }

  getSuper(): boolean {
    const role = this.getRole();
    if (role && role === 'super') {
      return true;
    }
    return false;
  }

  getAdmin(): boolean {
    const role = this.getRole();
    if (role && role === 'admin') {
      return true;
    }
    return false;  
  }

  getUserName(): string {
    const storage = localStorage.getItem('currentUser');
    if (storage) {
      const temp = JSON.parse(storage);
      if (temp && 'name' in temp) {
        return temp['name'] 
      };
      return temp['first_name'] + ' ' + temp['last_name'];
    }
    return null;
  }

  login(email: string, password: string, provider: string): any {
    this.apollo.mutate<LoginUserResponse>({
      mutation: LOGIN_USER,
      variables: {
        email: email,
        password: password,
        provider: provider
      },
    }).pipe(first())
    .subscribe(({ data }) => {
      localStorage.setItem('currentUser', JSON.stringify(data.loginUser));
      return null;
    }, (error) => {
      return {reason: error.message, status: ''};
    });
  }

  logout() {
    localStorage.removeItem('currentUser');
    const userData = JSON.parse(localStorage.getItem('currentUser'));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!'
    return throwError(errorMessage);
  }

  private getRole(): string {
    const storage = localStorage.getItem('currentUser');
    if (storage) {
      const temp = JSON.parse(storage);
      if (temp && 'role' in temp) {
          return temp.role;
      }
    }
    return null;
  }
}
