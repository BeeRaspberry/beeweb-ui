import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorDialogComponent } from './error-dialog.component';

@Injectable({ providedIn: 'root' })
export class ErrorDialogService {

    constructor(public dialog: MatDialog) { }
    openDialog(data: any): void {
        const dialogRef = this.dialog.open(ErrorDialogComponent, {
            width: '300px',
            data: data
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }
}
