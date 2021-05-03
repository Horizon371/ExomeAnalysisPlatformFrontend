import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataAnalysisService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  getCosanguinity(id: number): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(`${this.baseUrl}/analysis/cosanguinity`, id, options);
  }

  getIncidentialDiscoveries(id: number): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(`${this.baseUrl}/analysis/incidential`, id, options);
  }
}
