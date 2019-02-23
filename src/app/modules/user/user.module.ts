import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { LoginComponent } from './login.component';
import { MatDialogModule } from "@angular/material";

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    MatDialogModule
  ]
})
export class UserModule { }
