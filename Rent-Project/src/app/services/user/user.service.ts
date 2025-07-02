// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { AuthService } from '../auth/auth.service';
import { tap } from 'rxjs/operators';  // Import tap operator
import { UserRole } from '../../models/user-role.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5099/';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  getUsers(): Observable<User[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<User[]>(`${this.apiUrl}api/user`, { headers });
  }

  deleteUser(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`, { headers });
  }

  getProfile(): Observable<User> {
    const headers = this.getAuthHeaders();
    return this.http.get<User>(`${this.apiUrl}api/user/profil`, { headers }).pipe(
      tap((user: User) => {
        console.log('Connected User:', user);
      })
    );
  }

  updateUser(user: User): Observable<User> {
    const headers = this.getAuthHeaders();
    return this.http.put<User>(`${this.apiUrl}api/user/${user.email}`, user, { headers });
  }

  // Nouvelle méthode alias pour récupérer l'utilisateur connecté
  getConnectedUser(): Observable<User> {
    return this.getProfile();
  }
}
