import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ErrorDialogService } from '../../dialogs/error-dialog/error-dialog.service';
import { UserSessionService } from '../../shared/authentication/services/user-session.service';
import { LoginComponent } from '../user/login.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  returnUrl: string = '/';
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
    console.log('logout');
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
