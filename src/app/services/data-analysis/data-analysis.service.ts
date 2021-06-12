import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IncidentialDiscoveries} from '../../entities/response/incidentialDiscoveries';
import {map} from 'rxjs/operators';
import {GeneFrequencyEntry} from '../../entities/response/geneFrequencyEntry';

@Injectable({
  providedIn: 'root'
})
export class DataAnalysisService {
  private baseUrl = 'http://localhost:8080';

  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getCosanguinity(id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/analysis/cosanguinity`, id, this.options);
  }

  getIncidentialDiscoveries(id: number): Observable<IncidentialDiscoveries> {
    return this.http.post<IncidentialDiscoveries>(`${this.baseUrl}/analysis/incidential`, id, this.options);
  }

  getGeneFrequency(geneName: string): Observable<GeneFrequencyEntry[]>{
    return this.http.post<GeneFrequencyEntry[]>(`${this.baseUrl}/analysis/frequency`, geneName, this.options);
  }

  getClusterFigure(): Observable<any>{
    const options = {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let something = 'something';
    return this.http.post<any>(`${this.baseUrl}/analysis/clusteringImg`, something, options);
  }

  runClustering(): Observable<any> {
    let something = 'something';
    return this.http.post(`${this.baseUrl}/analysis/cluster`, something, this.options);
  }
}
