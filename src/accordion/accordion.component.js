import { Component } from '@angular/core';

@Component({
  selector: 'accordion',
  styleUrls: [ './accordion/accordion.component.scss' ],
  template: `<ul class="accordion">
  	<ng-content select="accordion-panel"></ng-content>
  </ul>`
})
export class AccordionComponent { }