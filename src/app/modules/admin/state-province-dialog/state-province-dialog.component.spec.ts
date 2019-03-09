import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateProvinceDialogComponent } from './state-province-dialog.component';

describe('StateProvinceDialogComponent', () => {
  let component: StateProvinceDialogComponent;
  let fixture: ComponentFixture<StateProvinceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateProvinceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateProvinceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
