import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AccordionComponent } from './accordion.component';
import { AccordionPanelComponent } from './accordion-panel.component';

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
export class AccordionModule { }
