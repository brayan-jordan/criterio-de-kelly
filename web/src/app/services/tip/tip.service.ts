import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tip } from './tip.types';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TipService {
  constructor(private httpClient: HttpClient) {}

  baseUrl() {
    return 'http://localhost:3001/';
  }

  get(): Observable<Tip[]> {
    return this.httpClient.get<Tip[]>(this.baseUrl() + 'tip');
  }
}
