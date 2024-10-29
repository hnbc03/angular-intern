import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  clearToken(): void {
    localStorage.removeItem('token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  setRefreshToken(refreshToken: string): void {
    localStorage.setItem('refreshToken', refreshToken);
  }

  clearRefreshToken(): void {
    localStorage.removeItem('refreshToken');
  }

  refreshToken(refreshToken: string): Observable<any> {
    return this.http.post('/api/refresh-token', { refreshToken }).pipe(
      tap((response: any) => {
        this.setToken(response.accessToken);
      })
    );
  }

  logout(): void {
    // Xóa cả access token và refresh token
    this.clearToken();
    this.clearRefreshToken();

    this.router.navigate(['/login']);
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role;
    }
    return null;
  }
}
