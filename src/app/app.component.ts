import { Component } from '@angular/core';
import { LoginComponent } from './modules/user/login.component';
import { MatDialog } from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ErrorDialogService} from './dialogs/error-dialog/error-dialog.service';
import {UserSessionService} from './shared/authentication/services/user-session.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bee UI';
  returnUrl = '/';
  loading = false;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private errorDialogService: ErrorDialogService,
    private userSessionService: UserSessionService) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
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
