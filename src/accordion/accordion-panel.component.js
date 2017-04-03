import {
	Component,
	Input,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import template from './accordion-panel.component.html';

@Component({
  selector: 'accordion-panel',
  styleUrls: [ './accordion/accordion.component.scss' ],
  animations: [
    trigger('panelState', [
      state('open', style({height: '*'})),
      transition('* => void', [
        style({height: '*'}),
        animate(400, style({height: 0}))
      ]),
      transition('* => open', [
        style({height: 0}),
        animate(400, style({height: '*'}))
      ]),
    ])
  ],
  template
})
export class AccordionPanelComponent {
	@Input() set heading(data) {
  	this.panelHeading = data;
  }

	panelActive = false;

	toggle() {
		this.panelActive = !this.panelActive;
	}
}