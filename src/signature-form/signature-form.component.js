import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";

import { SocialNetworks } from '../common/social-networks.constant';
import template from './signature-form.component.html';

@Component({
  selector: 'signature-form',
  styleUrls: [ './signature-form/signature-form.component.scss' ],
  template
})
export class SignatureFormComponent {
	static get parameters() {
	  return [[FormBuilder]];
	}

	@Output()
  formChange = new EventEmitter();

  signature = {};

  socialNetworks = SocialNetworks;

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
      	first: [ '', Validators.required ],
      	last: [ '', Validators.required ],
      }),
      email: [ '', Validators.required ],
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
      social: this.FormBuilder.array([
      	this.initSocial()
      ]),
    });
 
    this.formData.controls['name'].valueChanges
    	.subscribe(({ first, last }) => this.onValueChanged({ first, last }));

    this.formData.valueChanges
    	.subscribe(data => this.onFormChanged(data));
  }

  initSocial() {
  	return this.FormBuilder.group({
    	type: '',
    	username: [ '', Validators.required ],
    	url: '',
    	style: '',
    });
  }

  addSocial() {
  	this.formData.controls['social'].push(this.initSocial());
  }

  removeSocial(i) {
  	this.formData.controls['social'].removeAt(i);
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