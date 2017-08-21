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

@Component({
  selector: 'accordion-panel',
  templateUrl: './accordion-panel.component.html',
  styleUrls: ['./accordion.component.scss'],
  animations: [
    trigger('panelState', [
      state('open', style({height: '*'})),
      transition('* => void', [
        style({height: '*'}),
        animate('600ms ease-out', style({height: 0}))
      ]),
      transition('* => open', [
        style({height: 0}),
        animate('600ms ease-out', style({height: '*'}))
      ]),
    ])
  ],
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
