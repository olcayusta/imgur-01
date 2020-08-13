import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { UploadService } from '../upload/upload.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  @Output() sidenavOpen = new EventEmitter();

  constructor(@Inject(DOCUMENT) private document: Document, private uploadService: UploadService) { }

  ngOnInit() {
  }

  onUploadButtonClicked() {
    const input = this.document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.click();
    input.onchange = (ev) => {
      const file = (ev.target as HTMLInputElement).files[0];
      const fileToBlobUrl = URL.createObjectURL(file);
      console.log(fileToBlobUrl);
    };
  }
}
