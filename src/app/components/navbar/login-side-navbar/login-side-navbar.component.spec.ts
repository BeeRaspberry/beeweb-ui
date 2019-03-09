import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSideNavbarComponent } from './login-side-navbar.component';

describe('LoginSideNavbarComponent', () => {
  let component: LoginSideNavbarComponent;
  let fixture: ComponentFixture<LoginSideNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginSideNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSideNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
