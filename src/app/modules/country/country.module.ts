import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CustomMaterialModule } from '../../material.module';

import { SelectCountryComponent } from './select-country/select-country.component';
import { CountryDialogComponent } from '../country/country-dialog/country-dialog.component';

@NgModule({
  declarations: [
    SelectCountryComponent,
    CountryDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
  ],
  exports: [
    SelectCountryComponent,
    CountryDialogComponent
  ],
  entryComponents: [CountryDialogComponent],
})
export class CountryModule { }
