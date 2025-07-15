import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { AuthService } from '../auth/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5099/api/User';

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
    return this.http.get<User[]>(this.apiUrl, { headers });
  }

  addUser(user: User): Observable<User> {
    const headers = this.getAuthHeaders();
    return this.http.post<User>(this.apiUrl, user, { headers });
  }

  updateUser(user: User): Observable<User> {
    const headers = this.getAuthHeaders();
    if (!user.id) {
      throw new Error('L\'id utilisateur est requis pour la mise à jour');
    }
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user, { headers });
  }

  deleteUser(id: string): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  getProfile(): Observable<User> {
    const headers = this.getAuthHeaders();
    return this.http.get<User>(`${this.apiUrl}/profil`, { headers }).pipe(
      tap((user: User) => {
        console.log('Connected User:', user);
      })
    );
  }

  getConnectedUser(): Observable<User> {
    return this.getProfile();
  }
}
