import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploaderService {
  constructor(private http: HttpClient) {}

  // file from event.target.files[0]
  uploadFile(url: string, file: File) {
    const formData = new FormData();
    formData.append('upload', file);
    const params = new HttpParams();
    const options = {
      params: params,
      reportProgress: true
    };
    const req = new HttpRequest('POST', url, formData, options);
    return this.http.request<any>(req);
  }
}
