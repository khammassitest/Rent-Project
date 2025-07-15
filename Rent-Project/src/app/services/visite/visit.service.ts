import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Visit {
  id: string;
  propertyId: string;
  createdAt: string;
  visitDate: string;
  status: 'WAITING' | 'CONFIRMED' | 'REFUSED' | 'REPORTED';
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class VisitService {
  private apiUrl = 'http://localhost:5099/api/Visits'; 

  constructor(private http: HttpClient) {}

  getAll(): Observable<Visit[]> {
    return this.http.get<Visit[]>(this.apiUrl);
  }

  updateVisit(id: string, dto: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}`, dto);
  }
  
}
