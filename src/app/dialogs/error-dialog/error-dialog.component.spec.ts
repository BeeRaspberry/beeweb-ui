//import { async, ComponentFixture, TestBed } from '@angular/core/testing';
//import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ErrorDialogComponent } from './error-dialog.component';

describe('ErrorDialogComponent', () => {
  it('page title should be BeeWeb Error', () => {
    const data =  '{"reason": "This is a test","status": "200"}';
    const comp = new ErrorDialogComponent(data);
    expect(comp.title).toBe('BeeWeb Error', 'Title');
  });

});
