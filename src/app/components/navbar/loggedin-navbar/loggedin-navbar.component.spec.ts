import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedinNavbarComponent } from './loggedin-navbar.component';

describe('LoggedinSideNavbarComponent', () => {
  let component: LoggedinNavbarComponent;
  let fixture: ComponentFixture<LoggedinNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggedinNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedinNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
