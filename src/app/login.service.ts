import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  // Define the API URL for local development environment
  private apiUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  // Register method now accepts all fields and sends as JSON body to Flask backend
  register(
    username: string, 
    password: string, 
    name?: string, 
    email?: string, 
    phone?: string, 
    address?: string
  ): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Prepare the request body with all available fields
    const body: any = { username, password };

    if (name) body.name = name;
    if (email) body.email = email;
    if (phone) body.phone = phone;
    if (address) body.address = address;

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
