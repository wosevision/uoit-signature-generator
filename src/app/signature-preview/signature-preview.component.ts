import { Component, Input, ElementRef } from '@angular/core';

import { SocialNetworks, FormData } from '../shared/models';

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

  socialNetworks = SocialNetworks;

  constructor(private el: ElementRef) {}
}
