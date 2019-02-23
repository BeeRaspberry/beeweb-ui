import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavbarModule } from './modules/navbar/navbar.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { LoginComponent } from './modules/user/login.component';
import { HttpConfigInterceptor } from './interceptor/httpconfig.interceptor';
import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider,
  LinkedinLoginProvider, SocialLoginModule } from 'angular-6-social-login';
import {ErrorDialogService} from './dialogs/error-dialog/error-dialog.service';
import { ErrorDialogComponent } from './dialogs/error-dialog/error-dialog.component';

export function getAuthServiceConfigs() {
  return new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("Your-Facebook-app-id")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('930191446877-csirm9eu8qb4ghtpf03htn9k0hbqfvuk.apps.googleusercontent.com')
        },
        {
          id: LinkedinLoginProvider.PROVIDER_ID,
          provider: new LinkedinLoginProvider('1098828800522-m2ig6bieilc3tpqvmlcpdvrpvn86q4ks.apps.googleusercontent.com')
        },
      ]
  );
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    NavbarModule,
    SocialLoginModule
  ],
  providers: [
    ErrorDialogService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    { provide: AuthServiceConfig, useFactory: getAuthServiceConfigs },
  ],
  entryComponents: [ErrorDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
