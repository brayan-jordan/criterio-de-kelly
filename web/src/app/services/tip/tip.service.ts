import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Tip, TipInput } from './tip.types';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TipService {
  constructor(private httpClient: HttpClient) {}

  baseUrl() {
    return 'http://localhost:3001/';
  }

  get(
    filterByDescription: string,
    minOdd: number,
    maxOdd: number,
    startDate: Date,
    finishDate: Date,
    methodId: string,
    result: string
  ): Observable<Tip[]> {
    let params: HttpParams = new HttpParams();
    if (filterByDescription) {
      params = params.append('filterByDescription', filterByDescription);
    }

    if (minOdd) {
      params = params.append('minOdd', minOdd.toString());
    }

    if (maxOdd) {
      params = params.append('maxOdd', maxOdd.toString());
    }

    if (startDate && !isNaN(startDate.getTime())) {
      params = params.append('startDate', startDate.toString());
    }

    if (finishDate && !isNaN(finishDate.getTime())) {
      params = params.append('finishDate', finishDate.toString());
    }

    if (methodId) {
      params = params.append('methodId', methodId);
    }

    if (result) {
      params = params.append('result', result);
    }

    return this.httpClient.get<Tip[]>(this.baseUrl() + 'tip', { params });
  }

  post(tip: TipInput): Observable<Tip> {
    return this.httpClient.post<Tip>(this.baseUrl() + 'tip', tip);
  }
}
