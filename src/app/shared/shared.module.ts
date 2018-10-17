import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AccordionComponent } from './accordion/accordion.component';
import { AccordionPanelComponent } from './accordion/accordion-panel.component';
import { AbsoluteUrlPipe } from './absolute-url.pipe';

@NgModule({
  imports: [CommonModule, BrowserAnimationsModule],
  declarations: [AccordionComponent, AccordionPanelComponent, AbsoluteUrlPipe],
  exports: [AccordionComponent, AccordionPanelComponent]
})
export class SharedModule {}
