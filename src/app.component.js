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

import template from './app.component.html';
import styles from './app.component.scss';

@Component({
  selector: 'signature-generator',
  styles: [ styles ],
  template
})
export class AppComponent {
	static get parameters() {
	  return [
	  	[Http],
	  ];
	}
  constructor(Http) {
  	this.http = Http;
  }

  onFormChange(event) {
  	console.log('Form changes; outside', event);
  	this.formData = event;
  }

  onFormSubmit(html, addressee) {
  	console.log('Form submit; outside', html);
  	this.sendFormData({ html, addressee })
			.subscribe(
				result => this.resultSuccess = result.data,
				error =>  this.resultError = error.data);
  }

  sendFormData({ html, addressee }) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log({
			html, addressee
		});
  	return this.http.post('/lib/send.php', {
			html, addressee
		}, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  extractData(res) {
    let body = res.json();
    return body.data || {};
  }

  handleError (error) {
    // In a real world app, you might use a remote logging infrastructure
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
};