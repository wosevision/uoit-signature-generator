import { Component, Input, ElementRef } from '@angular/core';

import { SocialNetworks } from '../constants/social-networks.constant';
import template from './signature-preview.component.html';
import styles from './signature-preview.component.scss';

@Component({
  selector: 'signature-preview',
  template,
  styles: [ styles ]
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
    return this.el.nativeElement.innerHTML;
  }

  logoUrl = require('../assets/logos/uoit_logo-gs-horizontal.gif');
  socialNetworks = SocialNetworks;

  constructor(ElementRef) {
    this.el = ElementRef;
    this.formData = {};
  }
}
