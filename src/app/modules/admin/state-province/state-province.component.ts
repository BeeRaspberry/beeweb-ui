
import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { PROVINCE_LIST, DELETE_PROVINCE, ProvinceAllQueryResponse } from '../queries';
import { IProvince} from '../../interfaces';
import { FormBuilder, FormGroup, FormControl, FormArray} from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StateProvinceDialogComponent } from '../state-province-dialog/state-province-dialog.component';

@Component({
  selector: 'app-state-province',
  templateUrl: './state-province.component.html',
  styleUrls: ['./state-province.component.css']
})

export class StateProvinceComponent implements OnInit {
  selectedIds: string[] = [];
  provinceList: IProvince[] = [];
  displayedColumns: string[] = ['check', 'name', 'abbreviation', 'country'];
  loading = true;
  form: FormGroup;

  constructor(
    public dialog: MatDialog,
    private apollo: Apollo,
    private fb: FormBuilder
  ) { }

  onChange(provinceId: string, isChecked: boolean) {
    if (isChecked) {
      this.selectedIds.push(provinceId);
    } else {
      const index = this.selectedIds.indexOf(provinceId);
      if (index > -1) {
        this.selectedIds.splice(index, 1);
      }
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

  selectProvince(province: IProvince): void {
    this.openDialog(province);
  }

  addProvince() {
    this.openDialog({id: '', name: '', abbreviation: '', country: {id: '', name: '', shortName: ''}});
  }

  openDialog(province: IProvince): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.position = {
      'top': '0',
      'left': '0'
    };
    dialogConfig.data = province;

    const dialogRef = this.dialog.open(StateProvinceDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  delete(): void {
    for (let i = 0; i < this.selectedIds.length; i++) {
      this.deleteProvince( this.selectedIds[i] );
    }
    this.selectedIds = [];
  }

  deleteProvince(id: String) {
    this.apollo.mutate({
      mutation: DELETE_PROVINCE,
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
