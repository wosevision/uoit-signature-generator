import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'absoluteUrl' })
export class AbsoluteUrlPipe {
  transform(value) {
    const baseParts = window.location.href.split('/');
    baseParts.pop();
    baseParts.push(value);
    return baseParts.join('/');
  }
}
