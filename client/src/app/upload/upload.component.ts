import { Component, OnInit, ViewChild } from '@angular/core';
import { UploadService } from './upload.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  @ViewChild('file') file;
  public files: Set<File> = new Set();

  progress;
  canBeClosed = true;
  primaryButtonText = 'Upload';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;

  constructor(private uploadService: UploadService) { }

  ngOnInit() {
  }

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (const key in files) {
      if (!isNaN(parseInt(key, 10))) {
        this.files.add(files[key]);
      }
    }
  }

  addFiles() {
    this.file.nativeElement.click();
  }

  closeDialog() {
    if (this.uploadSuccessful) {
      console.log('yukleme islemi tamamlandi..');
    }

    this.uploading = true;

    this.progress = this.uploadService.upload(this.files);

    const allProgressObservables = [];
    for (const key in this.progress) {
      allProgressObservables.push(this.progress[key].progress);
    }

    forkJoin(allProgressObservables).subscribe(end => {
      this.uploadSuccessful = true;
      this.uploading = false;
    });
  }
}
