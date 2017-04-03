import 'reflect-metadata';
import 'zone.js';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/* App root */
import { AppComponent } from './app.component';

/* Feature modules */
import { AccordionModule } from './accordion/accordion';
import { SignatureFormModule } from './signature-form/signature-form';
import { SignaturePreviewModule } from './signature-preview/signature-preview';

@NgModule({
  imports: [
  	BrowserModule,
  	AccordionModule,
  	SignatureFormModule,
  	SignaturePreviewModule,
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [ AppComponent ]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);