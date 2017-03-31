import { Component, Input } from '@angular/core';

import template from './signature-preview.component.html';

@Component({
  selector: 'signature-preview',
  template
})
export class SignaturePreviewComponent {

	constructor() {
		this.formData = {};
	}

	@Input()
  get data() {
    return this.formData;
  }
  set data(data) {
  	this.formData = data || 'No data entered!';
  }
};