import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginState } from '../login-state.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginModalService {
    public loginSubject: BehaviorSubject<any> = new BehaviorSubject<any>(false);

    constructor() {
    }

    show() {
        this.loginSubject.next(<LoginState>{show: true});
    }

    hide() {
        this.loginSubject.next(<LoginState>{show: false});
    }
}
