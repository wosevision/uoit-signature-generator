import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/* App root */
import { AppComponent } from './app.component';

/* Feature modules */
import { SignatureFormModule } from './signature-form/signature-form.module';
import { SignaturePreviewModule } from './signature-preview/signature-preview.module';
import { CoreModule } from './core/core.module';

@NgModule({
  imports: [
    BrowserModule,
    SignatureFormModule,
    SignaturePreviewModule,
    CoreModule.forRoot({ url: 'https://api.uoit.ca/v2/directory' })
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
