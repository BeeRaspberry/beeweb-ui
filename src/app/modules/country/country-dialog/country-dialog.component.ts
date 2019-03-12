import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { TCountry } from '../../types';
import { CREATE_COUNTRY, UPDATE_COUNTRY } from '../queries';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Apollo} from 'apollo-angular';

@Component({
  selector: 'app-country-dialog',
  templateUrl: './country-dialog.component.html',
  styleUrls: ['./country-dialog.component.css']
})
export class CountryDialogComponent implements OnInit {
  form: FormGroup;
  formData: TCountry;
  update_flag = true;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CountryDialogComponent>,
    private apollo: Apollo,
    @Inject(MAT_DIALOG_DATA) data
  )
  {
    this.formData = data;
    (data['name'] === '') ? this.update_flag = false : this.update_flag = true;

    this.form = fb.group({
      name: new FormControl(['', Validators.required]),
      abbrev: new FormControl(['', Validators.required]),
    });
  }

  get f() {return this.form.controls; }

  ngOnInit() {
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    (this.update_flag) ? this.updateCountry() : this.addCountry();
  }

  updateCountry() {
    this.apollo.mutate({
      mutation: UPDATE_COUNTRY,
      variables: {
        name: this.f.name.value,
        shortName: this.f.abbrev.value
      }
    }).subscribe(({ data }) => {
    }, (error) => {
// TODO: Add Error Logic
    });  }

  addCountry(): void {
    this.apollo.mutate({
      mutation: CREATE_COUNTRY,
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
