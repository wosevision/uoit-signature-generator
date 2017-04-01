import { Component, Input } from '@angular/core';

import { SocialNetworks } from '../common/social-networks.constant';
import template from './signature-preview.component.html';

@Component({
  selector: 'signature-preview',
  template
})
export class SignaturePreviewComponent {
	@Input()
  get data() {
    return this.formData;
  }
  set data(data) {
  	this.formData = data || 'No data entered!';
  }

	socialNetworks = SocialNetworks;

	constructor() {
		this.formData = {};
	}
};