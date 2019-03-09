import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateProvinceComponent } from './state-province.component';

describe('StateProvinceComponent', () => {
  let component: StateProvinceComponent;
  let fixture: ComponentFixture<StateProvinceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateProvinceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateProvinceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
