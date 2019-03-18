import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ErrorDialogService } from '../../../dialogs/error-dialog/error-dialog.service';
import { UserSessionService } from '../../../shared/authentication/services/user-session.service';
import {UploadDialogComponent} from '../../../modules/upload/components/upload-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-loggedin-navbar',
  templateUrl: './loggedin-navbar.component.html',
  styleUrls: ['../navbar.component.css']
})
export class LoggedinNavbarComponent implements OnInit {
  loading = false;
  returnUrl = '/';

  constructor(
    private router: Router,
    private errorDialogService: ErrorDialogService,
    public userSessionService: UserSessionService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
  }

  openUpload() {
    const dialogRef = this.dialog.open(UploadDialogComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  logout() {
    this.userSessionService.logout()
      .pipe(first())
      .subscribe(
       data => {
         this.router.navigate([this.returnUrl]);
       },
       error => {
         this.errorDialogService.openDialog(error);
         this.loading = false;
       });
  }
}
