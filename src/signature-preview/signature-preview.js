import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignaturePreviewComponent } from './signature-preview.component';

@NgModule({
  imports: [
  	CommonModule,
  ],
  declarations: [
    SignaturePreviewComponent,
  ],
  exports: [ SignaturePreviewComponent ]
})
export class SignaturePreviewModule { }