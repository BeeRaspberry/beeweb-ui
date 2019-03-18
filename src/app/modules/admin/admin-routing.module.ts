import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CountryComponent } from './country/country.component';
import { StateProvinceComponent } from './state-province/state-province.component';
import { LocationComponent } from './location/location.component';
//import { LoggedInGuard } from '@app/shared/authentication/guards/logged-in-guard';
import { UserComponent } from '../user/user.component';
import {StateProvinceDialogComponent} from './state-province-dialog/state-province-dialog.component';

const adminRoutes: Routes = [
  { path: 'countries',
    component: CountryComponent,
 //   canActivate: [LoggedInGuard]
  },
//  { path: 'country/:id',
//    components: CountryDetailComponent,
//    data: { animation: 'country' }
//  },
  { path: 'locations',
    component: LocationComponent },
  { path: 'provinces',
    component: StateProvinceComponent,
//    canActivate: [LoggedInGuard]
  },
  // Doesn't work
 //     { path: 'users', components: UserComponent },
//  { path: 'province/:id',
//    components: StateProvinceDetailComponent,
//    data: { animation: 'country' }
//   },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
