import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VisitService {
  private apiUrl = 'http://localhost:5000/api/visits';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  updateVisit(id: string, dto: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, dto);
  }
}
