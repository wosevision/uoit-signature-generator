import { Injectable } from '@angular/core';
import {
  Http,
  Headers,
  RequestOptions,
  Response,
} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/distinct';

import {
  LocalPrefix,
  LdapColumns
} from '../constants';

@Injectable()
export class DirectoryService {

  directoryUrl =  `https://api.uoit.ca/v2/directory`;

  constructor(private http: Http) { }

  buildMapFunction(column) {
    return res => res.json().data.map(item => item[column]);
  }

  get(endpoint = '') {
    const headers = new Headers({ 'Accept': 'application/json', 'X-XSRF-TOKEN': null });
    const options = new RequestOptions({ headers });
    return this.http.get(`${ this.directoryUrl }${ endpoint }`, options)
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
      .concatMap(
        data => data.map(item => item[LdapColumns.TITLE])
      )
      .distinct();
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