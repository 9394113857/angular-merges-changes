import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://learningsubjects3.pythonanywhere.com';

  constructor(private http: HttpClient) { }

  register(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username, password };
    return this.http.post(`${this.apiUrl}/register`, body, { headers });
  }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username, password };
    return this.http.post(`${this.apiUrl}/login`, body, { headers });
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
}
