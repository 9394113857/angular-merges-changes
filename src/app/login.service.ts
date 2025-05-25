import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://127.0.0.1:5000';
  private httpTimeout = 5000; // 5 seconds

  constructor(private http: HttpClient) { }

  register(
    username: string,
    password: string,
    name?: string,
    email?: string,
    phone?: string,
    address?: string
  ): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body: any = { username, password };
    if (name) body.name = name;
    if (email) body.email = email;
    if (phone) body.phone = phone;
    if (address) body.address = address;

    return this.http.post(`${this.apiUrl}/register`, body, { headers }).pipe(
      timeout(this.httpTimeout),
      catchError((error) => {
        if (error.name === 'TimeoutError') {
          return throwError(() => new Error('Server is taking too long to respond. Please try again later.'));
        }
        if (error.status === 0) {
          return throwError(() => new Error('Cannot connect to the server. Please check your internet or try again later.'));
        }
        if (error.status === 400) {
          return throwError(() => new Error(error.error.message));
        }
        return throwError(() => new Error('An unexpected error occurred. Please try again.'));
      })
    );
  }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username, password };
    return this.http.post(`${this.apiUrl}/login`, body, { headers }).pipe(
      timeout(this.httpTimeout),
      catchError((error) => {
        if (error.name === 'TimeoutError') {
          return throwError(() => new Error('Server is not responding. Please try again later.'));
        }
        if (error.status === 0) {
          return throwError(() => new Error('Unable to reach the server. Check your connection.'));
        }
        if (error.status === 401) {
          return throwError(() => new Error('Invalid username or password.'));
        }
        return throwError(() => new Error('Login failed. Please try again.'));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }

  setSession(authResult: any) {
    localStorage.setItem('access_token', authResult.access_token);
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }

  getProfile(): Observable<any> {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('No token found');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/profile`, { headers });
  }
}
