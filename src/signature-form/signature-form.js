import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from "@angular/forms";

import { TextMaskModule } from 'angular2-text-mask';

import { AccordionModule } from '../accordion/accordion';
import { SignatureFormComponent } from './signature-form.component';

@NgModule({
  imports: [
  	CommonModule,
  	ReactiveFormsModule,
  	HttpModule,
  	TextMaskModule,
  	AccordionModule,
  ],
  declarations: [
    SignatureFormComponent,
  ],
  exports: [ SignatureFormComponent ]
})
export class SignatureFormModule { }