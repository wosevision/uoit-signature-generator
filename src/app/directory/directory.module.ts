import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectoryService } from '.';

@NgModule({
  providers: [
    DirectoryService,
  ]
})
export class DirectoryModule { }
