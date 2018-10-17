import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { SignaturePreviewComponent } from './signature-preview.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [SignaturePreviewComponent],
  exports: [SignaturePreviewComponent]
})
export class SignaturePreviewModule {}
