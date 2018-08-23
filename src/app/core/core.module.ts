import { NgModule, Optional, ModuleWithProviders, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  DirectoryService,
  DirectoryServiceConfig,
  DirectoryServiceConfigToken
} from './directory.service';

@NgModule({
  imports: [CommonModule],
  providers: [DirectoryService]
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
