import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorDialogService } from '../../../dialogs/error-dialog/error-dialog.service';
import { UserSessionService } from '../../../shared/authentication/services/user-session.service';

@Component({
  selector: 'app-loggedin-side-navbar',
  templateUrl: './loggedin-side-navbar.component.html',
  styleUrls: ['../navbar.component.css']
})
export class LoggedinSideNavbarComponent implements OnInit {
  loading = false;
  returnUrl = '/';

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private errorDialogService: ErrorDialogService,
    public userSessionService: UserSessionService) {}

  ngOnInit() {
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
