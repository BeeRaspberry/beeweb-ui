import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ErrorDialogService} from '../../../dialogs/error-dialog/error-dialog.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { TProvince } from '../../types';

@Component({
  selector: 'app-state-province-dialog',
  templateUrl: './state-province-dialog.component.html',
  styleUrls: ['./state-province-dialog.component.css']
})
export class StateProvinceDialogComponent implements OnInit {
  provinceForm: FormGroup;
  loading = false;
  submitted = false;
  formData: TProvince;
  showProvinceModal = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<StateProvinceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  )
  {
    this.formData = data.node;

    this.provinceForm = fb.group({
      name: new FormControl(['', Validators.required]),
      abbrev: new FormControl(['', Validators.required]),
      country: new FormControl(['', Validators.required])
    });
  }

  get f() { return this.provinceForm.controls; }

  update() {
// TODO: Need to send mutation
    this.submitted = true;

    if (this.provinceForm.invalid) {
      return;
    }

    this.dialogRef.close(this.provinceForm.value);
  }

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }
}
