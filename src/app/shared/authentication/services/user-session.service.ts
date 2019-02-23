import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {AuthService, FacebookLoginProvider, GoogleLoginProvider,
  LinkedinLoginProvider} from 'angular-6-social-login';
import { map } from 'rxjs/operators';
import { User } from '../../../models';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public static isAdmin: boolean = false;
    private provider = '';

  constructor(
    private http: HttpClient,
    private socialAuthService: AuthService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(localStorage.currentUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/login`, { email, password })
        .pipe(map(user => {
        // login successful if there's a jwt token in the response
          if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
          return user;
      }));
  }

  socialLogin(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    console.log('sociallogin');
    console.log(user);
    return this.http.post<any>(`${environment.apiUrl}/sociallogin`, { user })
        .pipe(map(userData => {
          console.log(userData);
        // login successful if there's a jwt token in the response
          if (userData && userData.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(userData));
            this.currentUserSubject.next(userData);
          }
          return userData;
      }));
  }

  socialSignIn(socialPlatform: string) {
    this.provider = socialPlatform;

    let socialPlatformProvider;
    if (socialPlatform === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    } else if (socialPlatform === 'linkedin') {
      socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        localStorage.setItem('currentUser', JSON.stringify(userData));
        this.currentUserSubject.next(userData);
        // Now sign-in with userData
        // ...
        return  userData;
        }
     );
  }

  logout(): Observable<any> {
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    if (userData['provider']) {
      this.socialAuthService.signOut().then(data => {
        console.log(data);
      });
    }
    return this.http.post<any>(`${environment.apiUrl}/logout`, { userData })
        .pipe(map(user => {
          localStorage.setItem('currentUser', '');
          localStorage.clear();
          console.log(user);
        }));
    }
}
