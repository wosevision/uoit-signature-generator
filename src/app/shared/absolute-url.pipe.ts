import { Pipe, PipeTransform } from '@angular/core';
import * as resolveUrl from 'resolve-url';

@Pipe({ name: 'absoluteUrl' })
export class AbsoluteUrlPipe implements PipeTransform {
  transform(value: string) {
    return resolveUrl(value);
  }
}
