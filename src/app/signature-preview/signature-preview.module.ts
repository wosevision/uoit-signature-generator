import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignaturePreviewComponent } from './signature-preview.component';
import { AbsoluteUrlPipe } from './absolute-url.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SignaturePreviewComponent,
    AbsoluteUrlPipe,
  ],
  exports: [ SignaturePreviewComponent ]
})
export class SignaturePreviewModule { }
