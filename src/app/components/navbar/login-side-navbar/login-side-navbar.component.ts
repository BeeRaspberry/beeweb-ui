import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../../../modules/user/login.component';

@Component({
  selector: 'app-login-side-navbar',
  templateUrl: './login-side-navbar.component.html',
  styleUrls: ['../navbar.component.css']
})
export class LoginSideNavbarComponent implements OnInit {

  constructor(
    public dialog: MatDialog) {}

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
