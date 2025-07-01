import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface LoginResponse {
  token: string;
  message?: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  role: string;
  fullName: string;
  address: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5099/auth'; // adapte selon ton backend
  private tokenKey = 'jwt_token';

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }

  private hasToken(): boolean {
    if (!this.isBrowser()) return false;
    return !!localStorage.getItem(this.tokenKey);
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(res => {
        if (this.isBrowser()) {
          localStorage.setItem(this.tokenKey, res.token);
        }
        this.loggedIn.next(true);
      })
    );
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.tokenKey);
    }
    this.loggedIn.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getToken(): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem(this.tokenKey);
  }

  // Méthode register adaptée avec les nouveaux champs
  register(userData: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/register`, userData);
}

}
