import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from "@angular/forms";

import { SignatureFormComponent } from './signature-form.component';

@NgModule({
  imports: [
  	CommonModule,
  	ReactiveFormsModule,
  	HttpModule
  ],
  declarations: [
    SignatureFormComponent,
  ],
  exports: [ SignatureFormComponent ]
})
export class SignatureFormModule { }