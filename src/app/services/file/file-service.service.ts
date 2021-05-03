import {ExomeInterface} from '../../entities/interfaces/exomeInterface';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ExomePageInterface} from '../../entities/response/exomePageInterface';

@Injectable({
  providedIn: 'root'
})
export class ExomeFileService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  upload(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('exomeFile', file);
    return this.http.post<any>(`${this.baseUrl}/exome/add`, formData);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/exome/all`);
  }

  getFilesPaginated(page: number, pageSize: number, nameFilter: string): Observable<ExomePageInterface> {
    const pageRequest = new PageRequest(page, pageSize, nameFilter);
    return this.http.post<ExomePageInterface>(`${this.baseUrl}/exome/all`, pageRequest);
  }

  getExome(id: number) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<ExomeInterface>(`${this.baseUrl}/exome/getExome`, id, options);
  }

  downloadExomeFile(id: number) {
    const options = {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(`${this.baseUrl}/exome/download`, id, options);
  }

  delete(id: number) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<ExomeInterface>(`${this.baseUrl}/exome/delete`, id, options);
  }
}

export class PageRequest {

  page: number;
  size: number;
  nameFilter: string;

  constructor(page: number, size: number, nameFilter: string) {
    this.page = page;
    this.size = size;
    this.nameFilter = nameFilter;
  }
}
