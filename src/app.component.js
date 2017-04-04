import { Component } from '@angular/core';

import template from './app.component.html';

@Component({
  selector: 'signature-generator',
  styleUrls: [ './app.component.scss' ],
  template
})
export class AppComponent {
  constructor() {
    this.what = "a good time!";
  }

  onFormChange(event) {
  	console.log('Form changes; outside', event);
  	this.formData = event;
  }

  onFormSubmit(template) {
  	console.log('Form submit; outside', template);
  }
};