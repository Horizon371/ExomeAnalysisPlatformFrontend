import { ExomeInterface } from '../../entities/interfaces/exomeInterface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExomePageInterface } from '../../entities/response/exomePageInterface'

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

  getFilesPaginated(page: number, pageSize: number, nameFilter: string): Observable<ExomePageInterface> {
    let pageRequest = new PageRequest(page, pageSize, nameFilter)
    let req = this.http.post<ExomePageInterface>(`${this.baseUrl}/exome/all`, pageRequest);
    return req
  }

  getExome(id: number) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let req = this.http.post<ExomeInterface>(`${this.baseUrl}/exome/getExome`, id, options);
    return req
  } 

  downloadExomeFile(id: number) {
    const options = {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let req = this.http.post<any>(`${this.baseUrl}/exome/download`, id, options);
    return req
  }

  delete(id: number){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let req = this.http.post<ExomeInterface>(`${this.baseUrl}/exome/delete`, id, options);
    return req
  }
}
export class PageRequest {

  page: number;
  size: number;
  nameFilter: string

  constructor(page: number, size: number, nameFilter: string) {
    this.page = page;
    this.size = size;
    this.nameFilter = nameFilter;
  }
}
