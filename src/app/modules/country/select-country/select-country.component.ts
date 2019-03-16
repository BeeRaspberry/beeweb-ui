import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { COUNTRY_LIST, CountryAllQueryResponse } from '../queries';
import { TCountry } from '../../types';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CountryDialogComponent } from '../country-dialog/country-dialog.component';

@Component({
  selector: 'app-select-country',
  templateUrl: './select-country.component.html',
  styleUrls: ['./select-country.component.css']
})
export class SelectCountryComponent implements OnInit {
  countryList: TCountry[] = [];
  private loading = false;
  countryForm: FormGroup;
  countryControl = new FormControl([''])

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private apollo: Apollo,
  )
  {
  }

  ngOnInit() {
    this.countryForm = this.fb.group({
    });
    this.apollo.watchQuery<CountryAllQueryResponse>({
      query: COUNTRY_LIST})
      .valueChanges.subscribe((response) => {
        this.countryList = response.data.countryList.edges;
        this.loading = response.data.loading;
    });
  }

  addCountry() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.position = {
      'top': '0',
      'left': '0'
    };
    dialogConfig.data = {name: '', shortName: ''};
    const dialogRef = this.dialog.open(CountryDialogComponent, dialogConfig);
  }

}
