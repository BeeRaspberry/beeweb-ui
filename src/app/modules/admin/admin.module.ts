import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StateProvinceComponent } from './state-province/state-province.component';
import { LocationComponent } from './location/location.component';
import { StateProvinceDialogComponent } from './state-province-dialog/state-province-dialog.component';
import { LocationDialogComponent } from './location-dialog/location-dialog.component';
import { CountryComponent } from './country/country.component';
import { LocationListComponent } from './location-list/location-list.component';
import { CustomMaterialModule } from '../../material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { CountryModule } from '../country/country.module';
import {ErrorDialogComponent} from '../../dialogs/error-dialog/error-dialog.component';
import { UserComponent } from './user/user.component';
//import { UserListComponent } from './user-list/user-list.component';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

@NgModule({
  declarations: [
    StateProvinceComponent,
    LocationComponent,
    StateProvinceDialogComponent,
    LocationDialogComponent,
    CountryComponent,
    StateProvinceDialogComponent,
    LocationListComponent,
    UserComponent,
//    UserListComponent,
    UserDialogComponent
  ],
  imports: [
    CommonModule,
    CustomMaterialModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CountryModule
  ],
  exports: [
    StateProvinceComponent,
    LocationComponent,
    StateProvinceDialogComponent,
    LocationDialogComponent,
    CountryComponent,
    StateProvinceDialogComponent,
    LocationListComponent
  ],
  entryComponents: [StateProvinceDialogComponent],

})
export class AdminModule { }
