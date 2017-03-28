import { Component } from '@angular/core';

import template from './app.html';
import './app.scss';

@Component({
  selector: 'signature-generator',
  template
})
export class AppComponent {
  constructor() {
    this.what = "a good time!";
  }
};