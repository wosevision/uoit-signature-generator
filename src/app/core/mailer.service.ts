import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map } from 'rxjs/operators';

import { ApiResponse } from './api-response';
import { handleError } from './handle-error';
import { LocalPrefix } from '../shared';

@Injectable({
  providedIn: 'root'
})
export class MailerService {
  sendUrl = `${LocalPrefix}php/send.php`;

  constructor(private http: HttpClient) {}

  send({ html, addressee }) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<ApiResponse<string>>(
        this.sendUrl,
        {
          html,
          addressee
        },
        { headers }
      )
      .pipe(
        map(result => {
          if (result.success) {
            return result.data;
          } else {
            throw new Error(result.data);
          }
        }),
        catchError(handleError)
      );
  }
}
