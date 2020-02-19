import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUser } from '../interfaces';
import { CREATE_USER, UPDATE_USER } from '../queries';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Apollo} from 'apollo-angular';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {

  form: FormGroup;
  formData: IUser;
  update_flag = true;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    private apollo: Apollo,
    @Inject(MAT_DIALOG_DATA) data
  )
  {
    this.formData = data;
    (data['name'] === '') ? this.update_flag = false : this.update_flag = true;

    this.form = fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
//      firstName: new FormControl(''),
//      firstName: new FormControl(''),

    });
  }

  get f() {return this.form.controls; }

  ngOnInit() {
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    (this.update_flag) ? this.updateUser() : this.addUser();
  }

  updateUser() {
    this.apollo.mutate({
      mutation: UPDATE_USER,
      variables: {
        name: this.f.name.value,
        shortName: this.f.abbrev.value
      }
    }).subscribe(({ data }) => {
    }, (error) => {
// TODO: Add Error Logic
    });  }

  addUser(): void {
    this.apollo.mutate({
      mutation: CREATE_USER,
      variables: {
        name: this.f.name.value,
        shortName: this.f.abbrev.value
      }
    }).subscribe(({ data }) => {
      this.dialogRef.close();
    }, (error) => {
// TODO: Add Error Logic
      this.dialogRef.close();
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
