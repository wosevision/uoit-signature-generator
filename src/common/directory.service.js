import { Injectable } from '@angular/core';
import {
	Http,
	Headers,
	RequestOptions,
	Response,
} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/reduce';
import { X2JS } from 'x2js';

import { DirectoryColumns } from './directory.constant';

@Injectable()
export class DirectoryService {
	static get parameters() {
	  return [
	  	[Http],
	  ];
	}

  directoryUrl = 'lib/directory.php';

  constructor(Http) {
  	this.http = Http;
  }

  getDepartments() {
  	return this.getDirectoryBase()
	  	.concatMap(this.mapDepartments)
	  	.reduce((reduced, item) => {
	  		if (!reduced.includes(item)) {
	  			reduced.push(item);
	  		}
	  		return reduced;
	  	}, []);
  }

  getDirectoryBase() {
  	const headers = new Headers({ 'Accept': 'application/json' }),
  				options = new RequestOptions({ headers });
    return this.http.get(this.directoryUrl, options);
  }

  mapDepartments(res) {
  	return res.json().data.map(item => item[DirectoryColumns.DEPARTMENT]);
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