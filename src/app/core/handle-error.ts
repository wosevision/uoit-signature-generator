import { throwError } from 'rxjs';

export function handleError(error) {
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
