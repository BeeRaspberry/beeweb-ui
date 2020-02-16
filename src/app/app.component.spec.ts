import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {MaterialModule} from './material.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './modules/user/login.component';
import {ErrorDialogComponent} from './dialogs/error-dialog/error-dialog.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NavbarModule} from './modules/main-navbar/main-navbar.module';
import {AuthServiceConfig, SocialLoginModule} from 'angular-6-social-login';
import {ErrorDialogService} from './dialogs/error-dialog/error-dialog.service';
import {HttpConfigInterceptor} from './interceptor/httpconfig.interceptor';
import {getAuthServiceConfigs} from './app.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        LoginComponent,
        ErrorDialogComponent,
      ],
      imports: [
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
//        MaterialModule,
        NavbarModule,
        SocialLoginModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule
      ],
      providers: [
        ErrorDialogService,
        { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
        { provide: AuthServiceConfig, useFactory: getAuthServiceConfigs },
//    { provide: MdDialogRef, useValue: {} },
      ],
//      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'beeweb-ui'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('beeweb-ui');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to beeweb-ui!');
  });
});

