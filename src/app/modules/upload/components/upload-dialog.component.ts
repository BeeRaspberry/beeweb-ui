import {Component, OnInit, ViewChild} from '@angular/core';

import {UploadService} from '../upload.service';
import { MatDialogRef } from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.css']
})
export class UploadDialogComponent implements OnInit {
  @ViewChild('file') file;

  public files: Set<File> = new Set();
  uploadForm: FormGroup;

  submitted = false;

  constructor(
    private fb: FormBuilder,
    public uploadService: UploadService,
    public dialogRef: MatDialogRef<UploadDialogComponent>,
  ) {
    this.uploadForm = fb.group({
      uploadFile: new FormControl([''])
    });
  }

  get f() { return this.uploadForm.controls; }

  ngOnInit() {
  }

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    }
  }

  upload() {
    this.submitted = true;
    this.uploadService.upload(this.files);
  }

  close() {
    this.dialogRef.close();
  }
}
