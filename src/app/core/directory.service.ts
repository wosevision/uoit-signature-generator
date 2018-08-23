import { Injectable, InjectionToken, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/distinct';

import { LdapColumns } from '../shared';

export interface DirectoryServiceConfig {
  url: string;
}

export const DirectoryServiceConfigToken = new InjectionToken<DirectoryServiceConfig>(
  'DirectoryServiceConfig'
);

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {
  constructor(
    private http: Http,
    @Inject(DirectoryServiceConfigToken) private config: DirectoryServiceConfig
  ) {
    if (!config) {
      throw new Error('no DirectoryServiceConfig was provided');
    }
    if (!config.url) {
      throw new Error('no `url` provided in DirectoryServiceConfig');
    }
  }

  buildMapFunction(column) {
    return res => res.json().data.map(item => item[column]);
  }

  get(endpoint = '') {
    const headers = new Headers({ Accept: 'application/json', 'X-XSRF-TOKEN': null });
    const options = new RequestOptions({ headers });
    return this.http
      .get(`${this.config.url}${endpoint}`, options)
      .map(res => res.json().data)
      .catch(this.handleError);
  }

  getAll() {
    return this.get();
  }

  getDepartments() {
    return this.get('/departments');
  }

  getTitles() {
    return this.get()
      .concatMap(data => data.map(item => item[LdapColumns.TITLE]))
      .distinct();
  }

  handleError(error) {
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
