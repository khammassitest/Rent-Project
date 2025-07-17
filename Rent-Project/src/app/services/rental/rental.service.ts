import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from '../../models/property';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  private readonly apiUrl = 'http://localhost:5099/api/property';

  constructor(private http: HttpClient) {}

  getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(this.apiUrl);
  }

  getProperty(id: string): Observable<Property> {
    return this.http.get<Property>(`${this.apiUrl}/${id}`);
  }

  // ❗️ ID de type string (UUID)
  getRentalsByUserId(userId: string): Observable<Property[]> {
    return this.http.get<Property[]>(`http://localhost:5099/api/rentals/user/${userId}`);
  }

  createProperty(property: Partial<Property>): Observable<Property> {
    return this.http.post<Property>(this.apiUrl, property);
  }

  updateProperty(property: Property): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${property.id}`, property);
  }

  deleteProperty(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  uploadPhoto(propertyId: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/${propertyId}/upload-photo`, formData);
  }

  getPhoto(photoId: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/photo/${photoId}`, { responseType: 'blob' });
  }

  getPhotoPathsForProperty(propertyId: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/${propertyId}/photos`);
  }
}
