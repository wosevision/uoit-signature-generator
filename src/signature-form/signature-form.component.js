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

  signature = {};

  constructor(FormBuilder) {
  	this.FormBuilder = FormBuilder;
  }

  ngOnInit() {
  	this.buildForm();
  }

  buildForm() {
    this.formData = this.FormBuilder.group({
    	expert: { value: false, disabled: true },
      name: this.FormBuilder.group({
      	first: ['', Validators.required ],
      	last: ['', Validators.required ],
      }),
      email: ['', Validators.required ],
      credentials: this.FormBuilder.group({
      	title: '',
      	dept: '',
      }),
      phone: this.FormBuilder.group({
      	area: '',
      	office: '',
      	line: '',
      	ext: '',
      }),
    });
 
    this._name = this.formData.controls['name'];
 
    this._name.valueChanges
    	.subscribe(({ first, last }) => this.onValueChanged({ first, last }));

    this.formData.valueChanges
    	.subscribe(data => this.onFormChanged(data));
  }

  onValueChanged(data) {
    console.log('Form value change:', data);
  }

  onFormChanged(data) {
    console.log('Form change:', data);
		this.signature = data;
    this.formChange.emit(data);
  }

	onSubmit(event, formData) {
		console.log('Form submit:', formData);
		event.preventDefault();
	}
};