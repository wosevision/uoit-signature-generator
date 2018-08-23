import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

/* App root */
import { AppComponent } from './app.component';

/* Feature modules */
import { SignatureFormModule } from './signature-form/signature-form.module';
import { SignaturePreviewModule } from './signature-preview/signature-preview.module';
import { CoreModule } from './core/core.module';

@NgModule({
  imports: [BrowserModule, HttpModule, SignatureFormModule, SignaturePreviewModule, CoreModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
