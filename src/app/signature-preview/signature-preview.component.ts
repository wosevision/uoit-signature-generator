import { Component, Input, ElementRef } from '@angular/core';

import { SocialNetworks } from '../constants/social-networks';

@Component({
  selector: 'signature-preview',
  templateUrl: './signature-preview.component.html',
  styleUrls: ['./signature-preview.component.scss']
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

  logoUrl = '../assets/logos/uoit_logo-gs-horizontal.gif';
  socialNetworks = SocialNetworks;

  constructor(ElementRef) {
    this.el = ElementRef;
    this.formData = {};
  }
}
