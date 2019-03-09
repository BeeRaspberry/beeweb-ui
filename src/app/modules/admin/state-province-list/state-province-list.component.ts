import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { PROVINCE_LIST, ProvinceAllQueryResponse } from '../queries';
import { TProvince } from '../../types';
import { FormBuilder, FormGroup, FormControl, FormArray} from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { StateProvinceDialogComponent } from '../state-province-dialog/state-province-dialog.component';
import {IProvince} from '../../interfaces';

@Component({
  selector: 'app-state-province-list',
  templateUrl: './state-province-list.component.html',
  styleUrls: ['./state-province-list.component.css']
})
export class StateProvinceListComponent implements OnInit {
  selectedProvince: TProvince;
  provinceList: TProvince[] = [];
  displayedColumns: string[] = ['check', 'name', 'abbreviation', 'country'];
  loading = true;
  form: FormGroup;

  constructor(
    public dialog: MatDialog,
    private apollo: Apollo,
    private fb: FormBuilder
  ) { }

  onChange(province: string, isChecked: boolean) {
    const provinceFormArray = <FormArray>this.form.controls.useremail;

    if (isChecked) {
      provinceFormArray.push(new FormControl(province));
    } else {
      let index = provinceFormArray.controls.findIndex(x => x.value === province);
      provinceFormArray.removeAt(index);
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      province: this.fb.array([])
    });

    this.apollo.watchQuery<ProvinceAllQueryResponse>({
      query: PROVINCE_LIST})
      .valueChanges.subscribe((response) => {
        this.provinceList = response.data.stateProvinceList.edges;
        this.loading = response.data.loading;
    });
  }

  selectProvince(province: TProvince): void {
    this.openDialog(province);
  }

  newDialog() {
//    private data: IProvince;
//    this.openDialog(data);
  }

  openDialog(province: TProvince): void {
    console.log('open dialog');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.position = {
      'top': '0',
      'left': '0'
    };
    dialogConfig.data = province;

    const dialogRef = this.dialog.open(StateProvinceDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('result');
    });
  }

  delete(): void {
    console.log('hello');
  }
}
