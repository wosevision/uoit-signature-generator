import { Component } from '@angular/core';

import template from './form.html';

@Component({
  selector: 'generator-form',
  template
})
export class FormComponent {
  constructor() {
    // this.formData = {};
  }

	onSubmit(event, formData) {
		console.log(formData);
		event.preventDefault();
	}
};