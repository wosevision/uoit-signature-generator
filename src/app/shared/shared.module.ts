import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AccordionComponent } from './accordion/accordion.component';
import { AccordionPanelComponent } from './accordion/accordion-panel.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AccordionComponent,
    AccordionPanelComponent,
  ],
  exports: [
    AccordionComponent,
    AccordionPanelComponent,
  ]
})
export class SharedModule { }
