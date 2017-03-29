import { Component, Input } from '@angular/core';

import template from './signature-preview.component.html';

@Component({
  selector: 'signature-preview',
  template
})
export class SignaturePreviewComponent {

	constructor() {
		this._previewData = {};
	}

	@Input()
  get data() {
    return this._previewData;
  }
  set data(data) {
  	this._previewData = data || 'No data entered!';
  }
};