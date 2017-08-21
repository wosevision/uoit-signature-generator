import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TextMaskModule } from 'angular2-text-mask';
import { Ng2CompleterModule } from 'ng2-completer';

import { AccordionModule } from '../accordion/accordion.module';
import { SignatureFormComponent } from './signature-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextMaskModule,
    Ng2CompleterModule,
    AccordionModule,
  ],
  declarations: [
    SignatureFormComponent,
  ],
  exports: [ SignatureFormComponent ]
})
export class SignatureFormModule { }
