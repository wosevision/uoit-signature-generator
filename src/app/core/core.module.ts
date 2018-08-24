import { NgModule, Optional, ModuleWithProviders, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
  DirectoryService,
  DirectoryServiceConfig,
  DirectoryServiceConfigToken
} from './directory.service';
import { MailerService } from './mailer.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [DirectoryService, MailerService]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(config: DirectoryServiceConfig): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [{ provide: DirectoryServiceConfigToken, useValue: config }]
    };
  }
}
