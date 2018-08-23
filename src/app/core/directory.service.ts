import { Injectable, InjectionToken, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, concatMap, catchError, distinct } from 'rxjs/operators';

import { LdapColumns } from '../shared';

export interface DirectoryServiceConfig {
  url: string;
}

export interface DirectoryEntry {
  [LdapColumns.NAME_FIRST]: string;
  [LdapColumns.NAME_LAST]: string;
  [LdapColumns.DEPARTMENT]: string;
  [LdapColumns.TITLE]: string;
  [LdapColumns.EXTENSION]: string;
  [LdapColumns.OFFICE]: string;
  [LdapColumns.BUILDING]: string;
  [LdapColumns.EMAIL]: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T | T[];
}

export const DirectoryServiceConfigToken = new InjectionToken<DirectoryServiceConfig>(
  'DirectoryServiceConfig'
);

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {
  constructor(
    private http: HttpClient,
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
    const headers = new HttpHeaders({ Accept: 'application/json', 'X-XSRF-TOKEN': [null] });
    return this.http
      .get<ApiResponse<DirectoryEntry>>(`${this.config.url}${endpoint}`, { headers })
      .pipe(
        map(res => {
          if (res.success) {
            return res.data;
          } else {
            throwError(res);
          }
        }),
        catchError(this.handleError)
      );
  }

  getAll() {
    return this.get();
  }

  getDepartments() {
    return this.get('/departments');
  }

  getTitles() {
    return this.get().pipe(
      concatMap(data => (Array.isArray(data) ? data : [data]).map(item => item[LdapColumns.TITLE])),
      distinct()
    );
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
