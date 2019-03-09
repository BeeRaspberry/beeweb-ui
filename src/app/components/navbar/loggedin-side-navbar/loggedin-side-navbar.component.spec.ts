import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedinSideNavbarComponent } from './loggedin-side-navbar.component';

describe('LoggedinSideNavbarComponent', () => {
  let component: LoggedinSideNavbarComponent;
  let fixture: ComponentFixture<LoggedinSideNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggedinSideNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedinSideNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
