import { ErrorDialogService } from './error-dialog.service';
import { MatDialog } from '@angular/material';
import { TestBed } from '@angular/core/testing';

describe('ErrorDialogService', () => {
  let service: ErrorDialogService;
  let dialog: MatDialog;

  beforeEach(() => { service = new ErrorDialogService(dialog); });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
