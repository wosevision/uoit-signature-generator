import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs';

import { UploaderService, UploadRecord } from '../../core/uploader.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'upload-browser',
  templateUrl: './upload-browser.component.html',
  styleUrls: ['./upload-browser.component.scss']
})
export class UploadBrowserComponent implements OnInit {
  modalIsOpen = false;

  images: Observable<UploadRecord[]>;

  @Output()
  select = new EventEmitter<UploadRecord>();

  constructor(private uploader: UploaderService) {}

  ngOnInit() {}

  toggleModal(state: boolean) {
    this.getUploads();
    this.modalIsOpen = state;
  }

  getUploads() {
    this.images = this.uploader.getUploads().pipe(tap(result => console.log(result)));
  }

  selectUpload(image: UploadRecord) {
    this.select.emit(image);
    this.toggleModal(false);
  }
}
