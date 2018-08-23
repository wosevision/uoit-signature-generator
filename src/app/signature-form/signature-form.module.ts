import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TextMaskModule } from 'angular2-text-mask';
import { Ng2CompleterModule } from 'ng2-completer';

import { SharedModule } from '../shared/shared.module';
import { SignatureFormComponent } from '.';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, TextMaskModule, Ng2CompleterModule, SharedModule],
  declarations: [SignatureFormComponent],
  exports: [SignatureFormComponent]
})
export class SignatureFormModule {}
