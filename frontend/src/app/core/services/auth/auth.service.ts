/*auth.service.ts*/
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, of, tap, throwError} from 'rxjs';
import { Router } from "@angular/router";
import { NavbarService } from "../navbar/navbar.service";
import { RegisterRequest } from "../../models/register-request.model";
import {AuthenticationRequest} from "../../models/login-request.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/v1/auth';
  private isAuthenticated = new BehaviorSubject<boolean>(this.hasToken());

  constructor(
    private router: Router,
    private navbarService: NavbarService,
    private http: HttpClient) {}

  private hasToken(): boolean {
    return typeof window !== 'undefined' && !!localStorage.getItem('access_token');
  }

  register(request: RegisterRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, request);
  }

  login(request: AuthenticationRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, request).pipe(
      tap(response => {
        localStorage.setItem('access_token', response.token);
        this.isAuthenticated.next(true);
        this.router.navigate(['/dashboard']);
      }),
      catchError(error => {
        console.error('Login failed', error);
        return throwError(() => new Error('Invalid email or password'));
      })
    );
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
    }
    this.isAuthenticated.next(false);
    this.navbarService.resetLinks();
    this.router.navigate(['/home']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
}
