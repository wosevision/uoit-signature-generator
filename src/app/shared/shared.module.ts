import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UploadBrowserComponent } from './upload-browser/upload-browser.component';
import { AccordionComponent } from './accordion/accordion.component';
import { AccordionPanelComponent } from './accordion/accordion-panel.component';
import { AbsoluteDimensionsDirective } from './absolute-dimensions.directive';
import { AbsoluteUrlPipe } from './absolute-url.pipe';

@NgModule({
  imports: [CommonModule, BrowserAnimationsModule],
  declarations: [
    UploadBrowserComponent,
    AccordionComponent,
    AccordionPanelComponent,
    AbsoluteDimensionsDirective,
    AbsoluteUrlPipe
  ],
  exports: [
    UploadBrowserComponent,
    AccordionComponent,
    AccordionPanelComponent,
    AbsoluteDimensionsDirective,
    AbsoluteUrlPipe
  ]
})
export class SharedModule {}
