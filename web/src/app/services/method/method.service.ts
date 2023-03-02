import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Method } from './method.types';

@Injectable({ providedIn: 'root' })
export class MethodService {
  constructor(private httpClient: HttpClient) {}

  baseUrl() {
    return 'http://localhost:3001/';
  }

  get(filterByName: string, filterByDescription: string): Observable<Method[]> {
    let params: HttpParams = new HttpParams();
    if (filterByName) {
      params = params.append('filterByName', filterByName);
    }

    if (filterByDescription) {
      params = params.append('filterByDescription', filterByDescription);
    }
    return this.httpClient.get<Method[]>(this.baseUrl() + 'method', {
      params,
    });
  }

  post(method: Method): Observable<Method> {
    return this.httpClient.post<Method>(this.baseUrl() + 'method', method);
  }
}
