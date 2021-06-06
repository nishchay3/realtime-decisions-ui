import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { TokenResponse, UserDetailsLogIn, UserDetailsReturned, UserDetailsSignUp } from '../dashboard/models/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly baseURL: string;
  private token: string | null;

  constructor(private http: HttpClient, private router: Router) {
    this.baseURL = "http://localhost:3000/api/"
  }

  private saveToken(token: string) {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  private getToken() {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  logout() {
    this.token = '';
    localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/');
  }

  getUserDetails(): UserDetailsReturned | null {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  createUser(user: UserDetailsSignUp): Observable<any> {
    return this.http.post(this.baseURL + 'signup', user).pipe(map((data: TokenResponse) => {
      if (data.token) {
        this.saveToken(data.token);
      }
      return data;
    }))
  }

  loginUser(user: UserDetailsLogIn): Observable<any> {
    return this.http.post(this.baseURL + 'login', user).pipe(map((data: TokenResponse) => {
      if (data.token) {
        this.saveToken(data.token);
      }
      return data;
    }))
  }

  getProfile(): Observable<any> {
    return this.http.get(this.baseURL + 'profile', { headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(map((data) => {
      return data;
    }))
  }

}
