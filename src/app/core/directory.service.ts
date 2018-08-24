import { Injectable, InjectionToken, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { of } from 'rxjs';
import { map, concatMap, catchError, distinct, tap } from 'rxjs/operators';

import { ApiResponse } from './api-response';
import { handleError } from './handle-error';
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

export const DirectoryServiceConfigToken = new InjectionToken<DirectoryServiceConfig>(
  'DirectoryServiceConfig'
);

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {
  private directoryCache: DirectoryEntry[];
  private departmentsCache: DirectoryEntry[];
  private titlesCache: string[];

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
    return this.http
      .get<ApiResponse<DirectoryEntry[]>>(`${this.config.url}${endpoint}`, {
        headers: new HttpHeaders({ Accept: 'application/json', 'X-XSRF-TOKEN': [null] })
      })
      .pipe(
        map(res => {
          if (res.success) {
            return res.data;
          } else {
            throw new Error(<any>res.data);
          }
        }),
        catchError(handleError)
      );
  }

  getAll() {
    return this.directoryCache
      ? of(this.directoryCache)
      : this.get().pipe(tap(data => (this.directoryCache = data)));
  }

  getDepartments() {
    return this.departmentsCache
      ? of(this.departmentsCache)
      : this.get('/departments').pipe(tap(data => (this.departmentsCache = data)));
  }

  getTitles() {
    return this.titlesCache
      ? of(this.titlesCache)
      : this.getAll().pipe(
          concatMap(data => data.map(item => item[LdapColumns.TITLE])),
          distinct()
        );
  }
}
