import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialogRef } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from "@angular/forms";
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { LoginModalService } from '../../shared/authentication/services/login-modal.service';
import { UserSessionService } from '../../shared/authentication/services/user-session.service';
import { ErrorDialogService } from '../../dialogs/error-dialog/error-dialog.service';
import { LoginUserResponse } from '../../shared/authentication/services/interfaces';
import { LoginState } from '../../shared/authentication/login-state.interface';

@Component({
    selector: 'app-login-modal',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})

@Injectable({ providedIn: 'root' })

export class LoginComponent implements OnInit, OnDestroy {
  private errorSub: Subscription;
  private loginSub: Subscription;
  loginForm: FormGroup;
  loading = false;
  returnUrl: string = '/';
  submitted = false;
  showLoginModal = false;
  errorMessage = '';

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

  login(platform: string) {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const response = this.userSessionService.login(this.f.emailFormControl.value, this.f.passwordFormControl.value, platform);
    if (response) {
      this.errorDialogService.openDialog(response);
      this.loading = false;
    } else {
        this.close();
        this.router.navigate([this.returnUrl]);
    }
  }

  ngOnInit() {
    this.subscribeToLoginModal();
    this.errorSub = this.userSessionService.error_message.asObservable()
      .subscribe((error: string) => {
        const tempError = {'reason': error, status: ''};
        this.errorDialogService.openDialog(tempError);
        this.loading = false;
      })
  }

  close() {
    this.dialogRef.close();
  }

  subscribeToLoginModal() {
    this.loginSub = this.loginModalService.loginSubject.asObservable()
      .subscribe((state: LoginState) => {
        this.showLoginModal = state.show;
      });
  }

  ngOnDestroy() {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }
}
