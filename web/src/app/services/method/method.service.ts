import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Method } from './method.types';

@Injectable({ providedIn: 'root' })
export class MethodService {
  constructor(private httpClient: HttpClient) {}

  baseUrl() {
    return 'http://localhost:3001/';
  }

  get(): Observable<Method[]> {
    return this.httpClient.get<Method[]>(this.baseUrl() + 'method');
  }

  post(method: Method): Observable<Method> {
    return this.httpClient.post<Method>(this.baseUrl() + 'method', method);
  }
}
