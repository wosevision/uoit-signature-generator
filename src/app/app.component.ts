import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LocalPrefix } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  formData: {} | FormData = {};
  resultSuccess;
  resultError;

  sendUrl = `${LocalPrefix}vendor/send.php`;

  constructor(private http: HttpClient) {}

  onFormChange(event: FormData) {
    this.formData = event;
  }

  onFormSubmit(event, html, addressee) {
    event.preventDefault();
    this.sendFormData({ html, addressee }).subscribe(
      result => (this.resultSuccess = result),
      error => (this.resultError = error)
    );
  }

  sendFormData({ html, addressee }) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post(
        this.sendUrl,
        {
          html,
          addressee
        },
        { headers }
      )
      .pipe(catchError(this.handleError));
  }

  handleError(error) {
    let errMsg;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return throwError(errMsg);
  }
}
