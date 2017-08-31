import { Component } from '@angular/core';
import {
  Http,
  Response,
  Headers,
  RequestOptions,
} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { LocalPrefix } from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  formData: {} | FormData = {};
  resultSuccess;
  resultError;

  sendUrl = `${ LocalPrefix }vendor/send.php`;

  constructor(private http: Http) {}

  onFormChange(event: FormData) {
    this.formData = event;
  }

  onFormSubmit(html, addressee) {
    this.sendFormData({ html, addressee })
      .subscribe(
        result => this.resultSuccess = result,
        error =>  this.resultError = error);
  }

  sendFormData({ html, addressee }) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.sendUrl, {
      html, addressee
    }, options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  handleError (error) {
    let errMsg;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
