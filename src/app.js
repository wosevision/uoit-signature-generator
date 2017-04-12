import 'reflect-metadata';
import 'zone.js';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

/* App root */
import { AppComponent } from './app.component';

/* Feature modules */
import { SignatureFormModule } from './signature-form/signature-form';
import { SignaturePreviewModule } from './signature-preview/signature-preview';

/* Common providers */
import { DirectoryService } from './common/directory.service';

@NgModule({
  imports: [
  	BrowserModule,
  	SignatureFormModule,
  	SignaturePreviewModule,
  	HttpModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
  	DirectoryService,
  ],
  bootstrap: [ AppComponent ]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);