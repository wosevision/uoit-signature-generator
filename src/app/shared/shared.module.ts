import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AccordionComponent } from './accordion/accordion.component';
import { AccordionPanelComponent } from './accordion/accordion-panel.component';
import { AbsoluteDimensionsDirective } from './absolute-dimensions.directive';
import { AbsoluteUrlPipe } from './absolute-url.pipe';

@NgModule({
  imports: [CommonModule, BrowserAnimationsModule],
  declarations: [
    AccordionComponent,
    AccordionPanelComponent,
    AbsoluteDimensionsDirective,
    AbsoluteUrlPipe
  ],
  exports: [
    AccordionComponent,
    AccordionPanelComponent,
    AbsoluteDimensionsDirective,
    AbsoluteUrlPipe
  ]
})
export class SharedModule {}
