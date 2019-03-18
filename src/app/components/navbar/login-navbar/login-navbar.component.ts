import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../../../modules/user/login.component';

@Component({
  selector: 'app-login-navbar',
  templateUrl: './login-navbar.component.html',
  styleUrls: ['../navbar.component.css']
})
export class LoginNavbarComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) {}

  ngOnInit() {
  }

  openLogin(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
