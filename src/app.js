import 'reflect-metadata';
import 'zone.js';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { enableProdMode } from '@angular/core';
// enableProdMode();

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/* App root */
import { AppComponent } from './app.component';

/* Feature modules */
import { SignatureFormModule } from './signature-form/signature-form';
import { SignaturePreviewModule } from './signature-preview/signature-preview';

@NgModule({
  imports: [
  	BrowserModule,
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