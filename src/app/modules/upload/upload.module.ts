import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadDialogComponent } from './components/upload-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomMaterialModule} from '../../material.module';

@NgModule({
  declarations: [
    UploadDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
  ],
  exports: [
    UploadDialogComponent
  ],
  entryComponents: [
    UploadDialogComponent
  ]
})
export class UploadModule { }
