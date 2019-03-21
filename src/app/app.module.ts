import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { CustomMaterialModule } from './material.module';
import { LoginComponent } from './modules/user/login.component';
import { HttpConfigInterceptor } from './interceptor/httpconfig.interceptor';
import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider,
  LinkedinLoginProvider, SocialLoginModule } from 'angular-6-social-login';
import { ErrorDialogService } from './dialogs/error-dialog/error-dialog.service';
import { ErrorDialogComponent } from './dialogs/error-dialog/error-dialog.component';
import { MainNavbarComponent } from './components/navbar/main-navbar/main-navbar.component';
import { LoginNavbarComponent } from './components/navbar/login-navbar/login-navbar.component';
import { LoggedinNavbarComponent } from './components/navbar/loggedin-navbar/loggedin-navbar.component';
import { LoginSideNavbarComponent } from './components/navbar/login-side-navbar/login-side-navbar.component';
import { LoggedinSideNavbarComponent } from './components/navbar/loggedin-side-navbar/loggedin-side-navbar.component';
import { AdminNavbarComponent } from './components/navbar/admin-navbar/admin-navbar.component';
import { AdminSideNavbarComponent } from './components/navbar/admin-side-navbar/admin-side-navbar.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { AdminModule } from './modules/admin/admin.module';
import {CountryModule} from './modules/country/country.module';
import { UploadDialogComponent } from './modules/upload/components/upload-dialog.component';
import {UploadModule} from './modules/upload/upload.module';
import {environment} from '../environments/environment.prod';

export function getAuthServiceConfigs() {
  return new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider(`${environment.facebookApi}`)
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(`${environment.googleApi}`)
        },
        {
          id: LinkedinLoginProvider.PROVIDER_ID,
          provider: new LinkedinLoginProvider(`${environment.linkedInApi}`)
        },
      ]
  );
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorDialogComponent,
    MainNavbarComponent,
    LoginNavbarComponent,
    LoggedinNavbarComponent,
    LoginSideNavbarComponent,
    LoggedinSideNavbarComponent,
    AdminNavbarComponent,
    AdminSideNavbarComponent,
    HomeComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpLinkModule,
    ApolloModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    SocialLoginModule,
    AdminModule,
    UploadModule,
    AppRoutingModule,
    CountryModule
  ],
  providers: [
    ErrorDialogService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    { provide: AuthServiceConfig, useFactory: getAuthServiceConfigs },
  ],
  entryComponents: [ErrorDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
      apollo.create({
        link: httpLink.create({uri: 'http://localhost:5000/graphql'}),
        cache: new InMemoryCache()
      });
  }
}
