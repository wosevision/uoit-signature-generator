import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { SignatureFormComponent } from './signature-form.component';

@NgModule({
  imports: [
  	CommonModule,
  	FormsModule,
  ],
  declarations: [
    SignatureFormComponent,
  ],
  exports: [ SignatureFormComponent ]
})
export class SignatureFormModule { }