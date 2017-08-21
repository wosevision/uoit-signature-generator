import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'absoluteUrl' })
export class AbsoluteUrlPipe implements PipeTransform {
  transform(value) {
    const baseParts = window.location.href.split('/');
    baseParts.pop();
    baseParts.push(value);
    return baseParts.join('/');
  }
}
