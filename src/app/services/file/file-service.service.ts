import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ExomePageInterface} from '../../entities/response/exomePageInterface'
@Injectable({
  providedIn: 'root'
})
export class ExomeFileService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('exomeFile', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/exome/add`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/exome/all`);
  }

  getFilesPaginated(page: number, pageSize: number): Observable<ExomePageInterface> {
    let pageRequest = new PageRequest(page, pageSize)
    let req = this.http.post<ExomePageInterface>(`${this.baseUrl}/exome/all`, pageRequest);
    return req
  }

}
export class PageRequest {

  page: number;
  size: number;

  constructor(page: number,  size: number){
    this.page = page;
    this.size = size;
  }
}
