import { Pipe, PipeTransform } from '@angular/core';
import * as urlJoin from 'url-join';

import { environment } from '../../environments/environment';

@Pipe({ name: 'absoluteUrl' })
export class AbsoluteUrlPipe implements PipeTransform {
  transform(value) {
    return urlJoin(window.location.href, value);
  }
}
