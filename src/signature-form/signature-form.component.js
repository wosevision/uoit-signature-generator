import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";

import { CompleterService } from 'ng2-completer';

import { SocialNetworks, ButtonStyles } from '../constants/social-networks.constant';
import { EventIcons } from '../constants/event-icons.constant';
import { LdapColumns } from '../constants/ldap-columns.constant';
import { BrandLogos } from '../constants/brand-logos.constant';
import { DirectoryService } from '../directory/directory.service';

import template from './signature-form.component.html';
import styles from './signature-form.component.scss';

const DIGIT = /\d/,
			DIGIT_1TO9 = /[1-9]/;
/**
 * @example
 * <signature-form (formChange)="onFormChange($event)"></signature-form> 
 */
@Component({
  selector: 'signature-form',
  styles: [ styles ],
  template
})
export class SignatureFormComponent {
	static get parameters() {
	  return [
	  	[FormBuilder],
	  	[DirectoryService],
	  	[CompleterService],
	  ];
	}

	@Output() formChange = new EventEmitter();
	@Output() formSubmit = new EventEmitter();

  signature = {};
  socialNetworks = SocialNetworks;
  buttonStyles = ButtonStyles;
  eventIcons = EventIcons;
  brandLogos = BrandLogos;
  phoneMask = [
  	'(', DIGIT_1TO9, DIGIT, DIGIT, ')',
  	' ', DIGIT, DIGIT, DIGIT,
  	'.', DIGIT, DIGIT, DIGIT, DIGIT
  ];

  constructor(FormBuilder, DirectoryService, CompleterService) {
  	this.fb = FormBuilder;
  	this.directory = DirectoryService;
  	this.completer = CompleterService;
  }

  ngOnInit() {
  	this.buildForm();
  	const directory = this.directory.getAll(),
  				firstNameColumn = LdapColumns.NAME_FIRST,
  				lastNameColumn = LdapColumns.NAME_LAST,
  				titleColumn = LdapColumns.TITLE,
  				emailColumn = LdapColumns.EMAIL,
  				departmentColumn = LdapColumns.DEPARTMENT;
  	this.directory = {
  		firstNames: this.completer.local(directory, firstNameColumn, firstNameColumn),
  		lastNames: this.completer.local(directory, lastNameColumn, lastNameColumn),
  		titles: this.completer.local(directory, titleColumn, titleColumn),
  		emails: this.completer.local(directory, emailColumn, emailColumn),
  		departments: this.completer.local(directory, departmentColumn, departmentColumn),
  	};
  }

  buildForm() {
    this.formData = this.fb.group({
    	expert: { value: false, disabled: true },
      name: this.fb.group({
      	first: [ '', Validators.required ],
      	last: [ '', Validators.required ],
      }),
      contact: this.fb.group({
	      phone: [ '(905) 721.8668', Validators.required ],
	      ext: [ '', Validators.required ],
	      email: [ '', Validators.required ],
	      website: [ 'uoit.ca', Validators.required ],
      }),
      credentials: this.fb.group({
      	title: '',
      	dept: '',
      }),
      social: this.fb.group({
	      style: this.buttonStyles[0],
      	networks: this.fb.array([
	      	this.initSocial({ type: 'fb', username: 'myuoit'}),
	      	this.initSocial({ type: 'tw', username: 'uoit'}),
	      	this.initSocial({ type: 'li', username: 'uoit'}),
	      	this.initSocial({ type: 'yt', username: 'universityofontario'})
	      ]),
      }),
      logo: this.brandLogos[0],
      event: this.fb.group({
      	use: false,
      	data: this.fb.group({
		      icon: '',
		      size: '',
		      name: '',
		      date: '',
		      desc: '',
		      cta: '',
		      url: '',
		    })
      }),
      message: this.fb.group({
      	style: '',
      	content: '',
      }),
    });
 
    this.formData.controls['name'].valueChanges
    	.subscribe(({ first, last }) => this.onValueChange({ first, last }));

    this.formData.valueChanges
    	.subscribe(data => this.onFormChange(data));

  	this.onFormChange(this.formData.value);
  }

  initSocial({ type = '', username = '' }) {
  	return this.fb.group({
    	type: this.socialNetworks.find(network => network.value === type),
    	username: [ username, Validators.required ],
    });
  }

  addSocial() {
  	this.formData.controls['social'].controls['networks'].push(this.initSocial());
  }

  removeSocial(i) {
  	this.formData.controls['social'].controls['networks'].removeAt(i);
  }

  onValueChange(data) {
    console.log('Form value change:', data);
  }

  onFormChange(data) {
    console.log('Form change:', data);
		this.signature = data;
    this.formChange.emit(data);
  }

	onSubmit(event, formData) {
		console.log('Form submit:', formData);
		event.preventDefault();
    this.formSubmit.emit(formData);
	}
};