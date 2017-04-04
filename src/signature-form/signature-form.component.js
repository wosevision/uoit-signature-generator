import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Headers, Http } from '@angular/http';

import { SocialNetworks } from '../common/social-networks.constant';
import template from './signature-form.component.html';

const DIGIT = /\d/,
			DIGIT_1TO9 = /[1-9]/;

@Component({
  selector: 'signature-form',
  styleUrls: [ './signature-form/signature-form.component.scss' ],
  template
})
export class SignatureFormComponent {
	static get parameters() {
	  return [
	  	[FormBuilder],
	  	[Http],
	  ];
	}

	@Output() formChange = new EventEmitter();

  signature = {};
  socialNetworks = SocialNetworks;
  phoneMask = [
  	'(', DIGIT_1TO9, DIGIT, DIGIT, ')',
  	' ', DIGIT, DIGIT, DIGIT,
  	'.', DIGIT, DIGIT, DIGIT, DIGIT
  ];

  constructor(FormBuilder, Http) {
  	this.fb = FormBuilder;
  	this.http = Http;
  }

  ngOnInit() {
  	this.buildForm();
  }

  buildForm() {
    this.formData = this.fb.group({
    	expert: { value: false, disabled: true },
      name: this.fb.group({
      	first: [ '', Validators.required ],
      	last: [ '', Validators.required ],
      }),
      contact: this.fb.group({
	      phone: [ '', Validators.required ],
	      ext: [ '', Validators.required ],
	      email: [ '', Validators.required ],
      }),
      credentials: this.fb.group({
      	title: '',
      	dept: '',
      }),
      social: this.fb.group({
	      style: '',
      	networks: this.fb.array([
	      	this.initSocial()
	      ]),
      }),
      event: this.fb.group({
	      icon: '',
	      size: '',
	      name: '',
	      date: '',
	      desc: '',
	      cta: '',
	      url: '',
      }),
    });
 
    this.formData.controls['name'].valueChanges
    	.subscribe(({ first, last }) => this.onValueChanged({ first, last }));

    this.formData.valueChanges
    	.subscribe(data => this.onFormChanged(data));
  }

  initSocial() {
  	return this.fb.group({
    	type: '',
    	username: [ '', Validators.required ],
    });
  }

  addSocial() {
  	this.formData.controls['social'].controls['networks'].push(this.initSocial());
  }

  removeSocial(i) {
  	this.formData.controls['social'].controls['networks'].removeAt(i);
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