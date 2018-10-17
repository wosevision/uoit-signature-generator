import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

import { fromEvent } from 'rxjs';
import { mapTo, map, take } from 'rxjs/operators';
import { Logger } from './logger';

@Directive({
  selector: '[absoluteDimensions]'
})
export class AbsoluteDimensionsDirective {
  private set width(value: string) {
    this.elWidth = value;
    this.styleWidth = value;
  }
  private set height(value: string) {
    this.elHeight = value;
    this.styleHeight = value;
  }

  @HostBinding('attr.width')
  elWidth: string;
  @HostBinding('attr.height')
  elHeight: string;
  @HostBinding('style.width')
  styleWidth: string;
  @HostBinding('style.height')
  styleHeight: string;

  @Input()
  absoluteDimensions: string;

  private logger = new Logger('absolute-dimensions.directive');

  constructor(el: ElementRef<HTMLImageElement>) {
    const nativeElement = el.nativeElement;
    fromEvent(nativeElement, 'load')
      .pipe(
        mapTo(nativeElement),
        map(({ naturalWidth, naturalHeight }) =>
          this.transformDimensions(naturalWidth, naturalHeight)
        ),
        take(1)
      )
      .subscribe(([width, height]) => {
        this.width = `${width}px`;
        this.height = `${height}px`;
      });
  }

  private transformDimensions(naturalWidth, naturalHeight) {
    let width = naturalWidth;
    let height = naturalHeight;
    if (this.absoluteDimensions) {
      const pxIndex = this.absoluteDimensions.indexOf('px');
      const percentIndex = this.absoluteDimensions.indexOf('%');
      let ratio = 1;
      if (pxIndex !== -1) {
        const pixels = parseInt(this.absoluteDimensions.slice(0, pxIndex));
        ratio = pixels / naturalWidth;
      } else if (percentIndex !== -1) {
        const percent = parseInt(this.absoluteDimensions.slice(0, percentIndex));
        ratio = percent / 100;
      } else {
        ratio = parseFloat(this.absoluteDimensions);
        if (isNaN(ratio)) {
          throw new Error(
            `invalid value for absoluteDimensions directive: "${this.absoluteDimensions}"`
          );
        }
      }
      width = naturalWidth * ratio;
      height = naturalHeight * ratio;
      this.logger.logGroup(
        'absoluteDimensions',
        ['ratio', ratio],
        ['width', width],
        ['naturalWidth', naturalWidth],
        ['height', height],
        ['naturalHeight', naturalHeight]
      );
    }
    return [width, height];
  }
}
