import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UploadService } from '../upload/upload.service';
import { HttpEventType } from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  file;

  imgFile;

  progress;
  filename;
  filetype;

  masonry = [
    {img: 'http://i.hizliresim.com/zG7g6R.gif', title: 'There are more stars in the universe than grains of sand on earth.'},
    {img: 'http://i.hizliresim.com/7BroEP.jpg', title: 'The horror'},
  ];

  constructor(private sanitizer: DomSanitizer, private renderer: Renderer2, private uploadService: UploadService) {
  }

  ngOnInit() {
    this.renderer.listen('window', 'paste', (ev) => {
      let imgFile = null;
      let idx = 0;
      const items = ev.clipboardData.items;
      for (idx = 0; idx < items.length; idx++) {

        if (items[idx].kind === 'file') {

          console.log(items[idx]);

          imgFile = items[idx].getAsFile();
          this.filename = items[idx].getAsFile().name;
          const blob = URL.createObjectURL(imgFile);
          this.file = this.sanitizer.bypassSecurityTrustUrl(blob);
          this.uploadService.upload2(imgFile).subscribe(event => {
            switch (event.type) {
              case HttpEventType.Sent:
                console.log('Request has been made!');
                break;
              case HttpEventType.ResponseHeader:
                console.log('Response header has been received!');
                break;
              case HttpEventType.UploadProgress:
                this.progress = Math.round(event.loaded / event.total * 100);
                console.log(`Uploaded! ${this.progress}%`);
                break;
              case HttpEventType.Response:
                console.log('Image successfully created!', event.body);
                setTimeout(() => {
                  this.progress = 0;
                }, 1500);
            }
          });
          break;
        }
      }
    });
  }

  onChange($event: Event) {
    const file = ($event.target as HTMLInputElement).files[0];
    const fileToBlobUrl = URL.createObjectURL(file);
    this.file = this.sanitizer.bypassSecurityTrustResourceUrl(fileToBlobUrl);
    this.filename = file.name;
    this.filetype = file.type;


    /*    this.uploadService.upload2(file).subscribe(event => {
          switch (event.type) {
            case HttpEventType.Sent:
              console.log('Request has been made!');
              break;
            case HttpEventType.ResponseHeader:
              console.log('Response header has been received!');
              break;
            case HttpEventType.UploadProgress:
              this.progress = Math.round(event.loaded / event.total * 100);
              console.log(`Uploaded! ${this.progress}%`);
              break;
            case HttpEventType.Response:
              console.log('Image successfully created!', event.body);
              setTimeout(() => {
                this.progress = 0;
              }, 1500);
          }
        });*/
  }

  onPaste($event: ClipboardEvent) {
    /*   console.log($event.clipboardData.items[0].getAsFile());
       const blob = URL.createObjectURL($event.clipboardData.items[0].getAsFile());
       console.log(blob);*/
  }
}
