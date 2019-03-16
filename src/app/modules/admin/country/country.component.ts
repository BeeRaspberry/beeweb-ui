import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { COUNTRY_LIST, CountryAllQueryResponse } from '../queries';
import { TCountry } from '../../types';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CountryDialogComponent } from '../../country/country-dialog/country-dialog.component';
import { DELETE_COUNTRY } from '../../country/queries';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})

export class CountryComponent implements OnInit {
  selectedIds: string[] = [];
  countryList: TCountry[] = [];
  displayedColumns: string[] = ['check', 'name', 'abbreviation'];
  loading = true;
  form: FormGroup;

  constructor(
    public dialog: MatDialog,
    private apollo: Apollo,
    private fb: FormBuilder
  ) { }

  onChange(countryId: string, isChecked: boolean) {
    if (isChecked) {
      this.selectedIds.push(countryId);
    } else {
      let index = this.selectedIds.indexOf(countryId);
      if (index > -1) {
        this.selectedIds.splice(index, 1);
      }
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      country: this.fb.array([])
    });

    this.apollo.watchQuery<CountryAllQueryResponse>({
      query: COUNTRY_LIST})
      .valueChanges.subscribe((response) => {
        this.countryList = response.data.countryList.edges;
        this.loading = response.data.loading;
    });
  }

  selectCountry(country: TCountry): void {
    this.openDialog(country);
  }

  addCountry() {
   this.openDialog({id: '', name: '', shortName: ''});
  }

  openDialog(country: TCountry) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.position = {
      'top': '0',
      'left': '0'
    };
    dialogConfig.data = country;
    const dialogRef = this.dialog.open(CountryDialogComponent, dialogConfig);
  }

  delete(): void {
    for (let i = 0; i < this.selectedIds.length; i++) {
      this.deleteCountry( this.selectedIds[i] );
    }
    this.selectedIds = [];
  }

  deleteCountry(id: String) {
    this.apollo.mutate({
      mutation: DELETE_COUNTRY,
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
