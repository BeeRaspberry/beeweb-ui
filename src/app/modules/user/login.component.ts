import {Component, Inject, OnInit} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialogRef } from '@angular/material/dialog';
import {Injectable} from '@angular/core';
import {FormBuilder, FormControl, Validators, FormGroup} from "@angular/forms";
import {first} from 'rxjs/operators';
import { UserSessionService } from '../../shared/authentication/services/user-session.service';
import { ErrorDialogService } from '../../dialogs/error-dialog/error-dialog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginModalService } from '../../shared/authentication/services/login-modal.service';
import {Subscription} from 'rxjs/Subscription';
import {LoginState} from '../../shared/authentication/login-state.interface';

@Component({
    selector: 'app-login-modal',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})

@Injectable()

export class LoginComponent implements OnInit {
  private subscription: Subscription;
  loginForm: FormGroup;
  loading = false;
  returnUrl: string = '/';
  submitted = false;
  showLoginModal = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private errorDialogService: ErrorDialogService,
    private loginModalService: LoginModalService,
    private userSessionService: UserSessionService,
    public dialogRef: MatDialogRef<LoginComponent>,
  ) {
    this.loginForm = fb.group({
      emailFormControl: new FormControl('', [Validators.required,
      Validators.email]),
      passwordFormControl: new FormControl('', [Validators.required])
    });
  }

  get f() { return this.loginForm.controls; }

  login() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.userSessionService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.close();
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.errorDialogService.openDialog(error);
          this.loading = false;
        });
  }

  socialSignIn(socialPlatform: string) {
    this.submitted = true;
    this.loading = true;
    const user = this.userSessionService.socialSignIn(socialPlatform);
    this.userSessionService.socialLogin()
      .pipe(first())
      .subscribe(
        data => {
          this.close();
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.errorDialogService.openDialog(error);
          this.loading = false;
        }
      );
  }

  ngOnInit() {
    this.subscribeToLoginModal();
  }

  close() {
    this.dialogRef.close();
  }

  subscribeToLoginModal() {
    this.subscription = this.loginModalService.loginSubject.asObservable()
      .subscribe((state: LoginState) => {
        this.showLoginModal = state.show;
      });
  }

}
