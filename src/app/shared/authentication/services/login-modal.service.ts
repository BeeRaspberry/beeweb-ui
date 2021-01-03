import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginState } from '../login-state.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginModalService {
    loginSubject: BehaviorSubject<LoginState> = new BehaviorSubject<LoginState>({show: false});

    show() {
        this.loginSubject.next(<LoginState>{show: true});
    }

    hide() {
        this.loginSubject.next(<LoginState>{show: false});
    }
}
