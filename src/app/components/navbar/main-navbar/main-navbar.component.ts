import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ErrorDialogService } from '../../../dialogs/error-dialog/error-dialog.service';
import { UserSessionService } from '../../../shared/authentication/services/user-session.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-mainnavbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['../navbar.component.css']
})
export class MainNavbarComponent implements OnInit {
  returnUrl: string = '/';
  loading = false;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private errorDialogService: ErrorDialogService,
    public userSessionService: UserSessionService
  ) {
  }

  ngOnInit(): void {
  }
}
