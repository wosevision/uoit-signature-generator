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

import { DirectoryColumns } from './directory-columns.constant';

@Injectable()
export class DirectoryService {
	static get parameters() {
	  return [
	  	[Http],
	  ];
	}

  directoryUrl = 'http://localhost:8888/uoit-signature-generator/dist/lib/directory.php';

  constructor(Http) {
  	this.http = Http;
  }

  buildMapFunction(column) {
  	return res => res.json().data.map(item => item[column]);
  }

  getDirectoryBase() {
  	const headers = new Headers({ 'Accept': 'application/json' }),
  				options = new RequestOptions({ headers });
    return this.http.get(this.directoryUrl, options);
  }

  getAll() {
  	return this.getDirectoryBase()
  		.map(res => res.json().data)
  		.catch(this.handleError)
  }

  getDepartments() {
  	return this.getDirectoryBase()
	  	.concatMap(this.buildMapFunction(DirectoryColumns.DEPARTMENT))
	  	.distinct()
	  	.catch(this.handleError)
  }

  getTitles() {
  	return this.getDirectoryBase()
	  	.concatMap(this.buildMapFunction(DirectoryColumns.TITLE))
	  	.distinct()
	  	.catch(this.handleError)
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