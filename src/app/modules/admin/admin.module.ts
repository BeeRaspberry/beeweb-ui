import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StateProvinceComponent } from './state-province/state-province.component';
import { LocationComponent } from './location/location.component';
import { StateProvinceDialogComponent } from './state-province-dialog/state-province-dialog.component';
import { LocationDialogComponent } from './location-dialog/location-dialog.component';
import { CountryComponent } from './country/country.component';
import { CountryDialogComponent } from './country-dialog/country-dialog.component';
import { StateProvinceListComponent } from './state-province-list/state-province-list.component';
import { LocationListComponent } from './location-list/location-list.component';
import { CustomMaterialModule } from '../../material.module';
import { AdminRoutingModule } from './admin-routing.module';
import {ErrorDialogComponent} from '../../dialogs/error-dialog/error-dialog.component';

@NgModule({
  declarations: [
    StateProvinceComponent,
    LocationComponent,
    StateProvinceDialogComponent,
    LocationDialogComponent,
    CountryComponent,
    CountryDialogComponent,
    StateProvinceListComponent,
    StateProvinceDialogComponent,
    LocationListComponent
  ],
  imports: [
    CommonModule,
    CustomMaterialModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    StateProvinceComponent,
    LocationComponent,
    StateProvinceDialogComponent,
    LocationDialogComponent,
    CountryComponent,
    CountryDialogComponent,
    StateProvinceListComponent,
    StateProvinceDialogComponent,
    LocationListComponent
  ],
  entryComponents: [StateProvinceDialogComponent],

})
export class AdminModule { }
