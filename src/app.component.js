import { Component } from '@angular/core';

import template from './app.component.html';
import './app.component.scss';

@Component({
  selector: 'signature-generator',
  template
})
export class AppComponent {
  constructor() {
    this.what = "a good time!";
  }
};