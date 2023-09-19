// authentication.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserLogin } from '../../models/user.model';
import { IFormBody } from '../../models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  ROOT_URL = 'https://assignment.leadtracker.cied.dev/v1'

  constructor(private http: HttpClient) { }

  login(payloadData: IFormBody): Observable<IUserLogin> {
    // Make an HTTP request to your login endpoint
    return this.http.post<IUserLogin>(`${this.ROOT_URL}/accounts/login/`, payloadData);
  }

  saveToken(token: string): void {
    // Save the token to local storage or a more secure storage mechanism
    localStorage.setItem('token', token);
  }
  saveUserId( id: string): void {
    // Save the token to local storage or a more secure storage mechanism
    localStorage.setItem('userId', id);
  }

  getToken(): string | null {
    // Retrieve the token from local storage
    return localStorage.getItem('token');
  }


  isLoggedIn(): boolean {
    // Check if a token is present and not expired
    const token = this.getToken();
    return !!token; // Return true if token exists
  }



  logout(): void {
    // Remove the token from storage on logout
    localStorage.removeItem('token');
  }
}
