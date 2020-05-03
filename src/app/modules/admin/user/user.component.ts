import { Component, OnInit } from '@angular/core';
import {IUser} from '../../interfaces';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Apollo} from 'apollo-angular';
import {DELETE_USER, USER_LIST, UserAllQueryResponse} from '../../queries';
import {UserDialogComponent} from '../../user-dialog/user-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  selectedIds: string[] = [];
  userList: IUser[] = [];
  displayedColumns: string[] = ['check', 'email', 'firstName', 'lastName', 'active'];
  loading = true;
  form: FormGroup;

  constructor(
    public dialog: MatDialog,
    private apollo: Apollo,
    private fb: FormBuilder
  ) { }

  onChange(userId: string, isChecked: boolean) {
    if (isChecked) {
      this.selectedIds.push(userId);
    } else {
      const index = this.selectedIds.indexOf(userId);
      if (index > -1) {
        this.selectedIds.splice(index, 1);
      }
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      user: this.fb.array([])
    });

    this.apollo.watchQuery<UserAllQueryResponse>({
      query: USER_LIST})
      .valueChanges.subscribe((response) => {
        this.userList = response.data.userList.edges;
        this.loading = response.data.loading;
    });
  }

  selectUser(user: IUser): void {
    console.log(user);
    this.openDialog(user);
  }

  addUser() {
    this.openDialog({id: '', firstName: '', lastName: '', email: '', active: true, phoneNumber: '',
      location: { id: '', city: '', streetAddress: '', postalCode: '', stateProvince: { id: '', abbreviation: '', name: '',
        country: {id: '', name: '', shortName: ''}}}});
  }

  openDialog(user: IUser): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.position = {
      'top': '0',
      'left': '0'
    };
    dialogConfig.data = user;

    const dialogRef = this.dialog.open(UserDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  delete(): void {
    for (let i = 0; i < this.selectedIds.length; i++) {
      this.deleteUser( this.selectedIds[i] );
    }
    this.selectedIds = [];
  }

  deleteUser(id: String) {
    this.apollo.mutate({
      mutation: DELETE_USER,
      variables: {
        id: id
      }
    }).subscribe(({ data }) => {
      console.log(data);
    }, (error) => {
      console.log(error);
// TODO: Add Error Logic
    });  }
}
