import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploaderService {
  constructor(private http: HttpClient) {}

  // file from event.target.files[0]
  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('upload', file);
    const params = new HttpParams();
    const options = {
      params: params,
      reportProgress: true
    };
    const req = new HttpRequest('POST', 'php/upload.php', formData, options);
    return this.http.request<{ message: string; filename: string }>(req);
  }
}
