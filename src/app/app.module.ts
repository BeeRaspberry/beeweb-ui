import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule, Injector, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { HttpClient } from '@angular/common/http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { CustomMaterialModule } from './material.module';
import { LoginComponent } from './modules/user/login.component';
import { HttpConfigInterceptor } from './interceptor/httpconfig.interceptor';
import { SocialAuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider,
  SocialLoginModule } from 'angularx-social-login';
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
import { CountryModule } from './modules/country/country.module';
import { AppConfigService } from './core/services/app-config.service';
import { GraphQLModule } from './modules/graphql/graphql.module';
import { AppInjector } from './core/services/app-injector.service';

export function getAppConfig(appConfig: AppConfigService) {
  return () => appConfig.loadConfig();
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
    AppRoutingModule,
    CountryModule,
    GraphQLModule
  ],
  providers: [
    ErrorDialogService,
    { provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor, 
      multi: true 
    },
    { provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('Your-Facebook-app-id')
          },
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('.apps.googleusercontent.com')
          },
    //       {
    //          id: LinkedinLoginProvider.PROVIDER_ID,
    //          provider: new LinkedinLoginProvider('.apps.googleusercontent.com')
    //        },
        ],
      } as SocialAuthServiceConfig,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: getAppConfig,
      deps: [AppConfigService],
      multi: true
    }
  ],
  entryComponents: [ErrorDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(injector: Injector) {
    AppInjector.setInjector(injector);
  }
}
