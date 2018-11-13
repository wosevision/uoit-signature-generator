import { Pipe, PipeTransform } from '@angular/core';
import * as urlJoin from 'url-join';

@Pipe({ name: 'absoluteUrl' })
export class AbsoluteUrlPipe implements PipeTransform {
  transform(value) {
    const { protocol, host, pathname } = window.location;
    return urlJoin(`${protocol}//${host}/${pathname}`, value);
  }
}
