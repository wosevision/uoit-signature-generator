import { Component } from '@angular/core';
import {
	Http,
	Response,
	Headers,
	RequestOptions,
} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import template from './app.component.html';

@Component({
  selector: 'signature-generator',
  styleUrls: [ './app.component.scss' ],
  template
})
export class AppComponent {
	static get parameters() {
	  return [
	  	[Http],
	  ];
	}
  constructor(Http) {
  	this.http = Http;
  }

  onFormChange(event) {
  	console.log('Form changes; outside', event);
  	this.formData = event;
  }

  onFormSubmit(template) {
  	console.log('Form submit; outside', template);
  }
};