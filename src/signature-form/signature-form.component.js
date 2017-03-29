import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";

import template from './signature-form.component.html';

@Component({
  selector: 'signature-form',
  template
})
export class SignatureFormComponent {
	static get parameters() {
	  return [[FormBuilder]];
	}

	@Output()
  get data() {
    return new EventEmitter();
  }

  constructor(FormBuilder) {
    this.formData = FormBuilder.group({
    	expert: false,
      name: FormBuilder.group({
      	first: ['', Validators.required ],
      	last: ['', Validators.required ],
      }),
      email: ['', Validators.required ],
      credentials: FormBuilder.group({
      	title: '',
      	dept: '',
      }),
      phone: FormBuilder.group({
      	area: '',
      	office: '',
      	line: '',
      	ext: '',
      }),
    });
  }

	onSubmit(event, formData) {
		console.log(formData);
		event.preventDefault();
	}
};