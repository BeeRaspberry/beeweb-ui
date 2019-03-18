import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/user/login.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: '', component: HomeComponent},
  { path: 'about', component: AboutComponent},
  {
    path: 'admin',
    loadChildren: './modules/admin/admin.module#AdminModule'
//    canActivateChild: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {enableTracing: false})],
  exports: [RouterModule]
})

export class AppRoutingModule { }

