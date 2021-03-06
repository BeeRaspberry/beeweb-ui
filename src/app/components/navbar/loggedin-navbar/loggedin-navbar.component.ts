import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ErrorDialogService } from '../../../dialogs/error-dialog/error-dialog.service';
import { UserSessionService } from '../../../shared/authentication/services/user-session.service';

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
    public userSessionService: UserSessionService
  ) {
  }

  ngOnInit() {
  }

  logout() {
    this.userSessionService.logout();
  }
}
