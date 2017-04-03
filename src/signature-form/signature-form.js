import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from "@angular/forms";

import { AccordionModule } from '../accordion/accordion';
import { SignatureFormComponent } from './signature-form.component';

@NgModule({
  imports: [
  	CommonModule,
  	ReactiveFormsModule,
  	HttpModule,
  	AccordionModule,
  ],
  declarations: [
    SignatureFormComponent,
  ],
  exports: [ SignatureFormComponent ]
})
export class SignatureFormModule { }