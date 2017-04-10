import { Component, Input, ElementRef } from '@angular/core';

import { SocialNetworks } from '../common/social-networks.constant';
import template from './signature-preview.component.html';

@Component({
  selector: 'signature-preview',
  template
})
export class SignaturePreviewComponent {
	static get parameters() {
	  return [
	  	[ElementRef],
	  ];
	}

	@Input()
  get data() {
    return this.formData;
  }
  set data(data) {
  	this.formData = data || 'No data entered!';
  }

  get template() {
    return JSON.parse(JSON.stringify(this.el.nativeElement.innerHTML));
  }

  logoUrl = require('../assets/logos/uoit_logo-gs-horizontal.gif');
	socialNetworks = SocialNetworks;

	constructor(ElementRef) {
		this.el = ElementRef;
		this.formData = {};
	}
};