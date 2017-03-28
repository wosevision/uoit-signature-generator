import { Component } from '@angular/core';

import template from './signature-form.component.html';

@Component({
  selector: 'signature-form',
  template
})
export class SignatureFormComponent {
  constructor() {
    // this.formData = {};
  }

	onSubmit(event, formData) {
		console.log(formData);
		event.preventDefault();
	}
};