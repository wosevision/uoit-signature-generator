import { Component, Input, ElementRef } from '@angular/core';

import { SocialNetworks, FormData } from '../models';

@Component({
  selector: 'signature-preview',
  templateUrl: './signature-preview.component.html',
  styleUrls: ['./signature-preview.component.scss']
})
export class SignaturePreviewComponent {

  @Input() data: Partial<FormData> = {};

  get template() {
    return this.el.nativeElement.innerHTML;
  }

  logoUrl = '../assets/logos/uoit_logo-gs-horizontal.gif';
  socialNetworks = SocialNetworks;

  constructor(private el: ElementRef) {}
}
