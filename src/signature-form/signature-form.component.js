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
  formChange = new EventEmitter();

  constructor(FormBuilder) {
    this.formData = FormBuilder.group({
    	expert: { value: false, disabled: true },
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

    this.formData.valueChanges.subscribe(data => {
      console.log('Form changes', data);
      this.formChange.emit(this.formData.value);
    })
  }

	onSubmit(event, formData) {
		console.log(formData);
		event.preventDefault();
	}
};