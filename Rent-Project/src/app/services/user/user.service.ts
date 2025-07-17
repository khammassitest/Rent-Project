import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { AuthService } from '../auth/auth.service';
import { tap, switchMap, map } from 'rxjs/operators';

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

  updateUser(email: string, user: User): Observable<User> {
    const headers = this.getAuthHeaders();
    return this.http.put<User>(`${this.apiUrl}/${encodeURIComponent(email)}`, user, { headers });
  }

  deleteUserByEmail(email: string): Observable<any> {
  const encodedEmail = encodeURIComponent(email);
  return this.http.delete(`http://localhost:5099/api/User/${encodedEmail}`);
}





  getProfile(): Observable<User> {
    const headers = this.getAuthHeaders();
    return this.http.get<User>(`${this.apiUrl}/profil`, { headers }).pipe(
      tap((user: User) => {
        console.log('Connected User:', user);
      })
    );
  }

  getUserByEmail(email: string): Observable<User> {
    const headers = this.getAuthHeaders();
    return this.http.get<User>(`${this.apiUrl}/${encodeURIComponent(email)}`, { headers });
  }

  /** Récupère le fullName de l'utilisateur connecté */
  getProfileFullName(): Observable<string> {
    const headers = this.getAuthHeaders();
    return this.http.get<User>(`${this.apiUrl}/profil`, { headers }).pipe(
      switchMap(user => this.getUserByEmail(user.email)),
      map(user => user.fullName),
      tap(fullName => console.log('Full Name:', fullName))
    );
  }

  getConnectedUser(): Observable<User> {
    return this.getProfile();
  }
}
