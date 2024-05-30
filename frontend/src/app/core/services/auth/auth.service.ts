/*auth.service.ts*/
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, of, tap, throwError} from 'rxjs';
import { Router } from "@angular/router";
import { NavbarService } from "../navbar/navbar.service";
import { LoginRequest, RegisterRequest } from "../../models/auth.model";
import { StorageService } from '../storage/storage.service';
import {UserResponse} from "../../models/user.model";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/v1/auth';
  private isAuthenticated = new BehaviorSubject<boolean>(this.hasToken());
  private currentUser = new BehaviorSubject<UserResponse | null>(null);

  constructor(
    private router: Router,
    private navbarService: NavbarService,
    private http: HttpClient,
    private storageService: StorageService) {
    this.loadUserFromStorage(); }

  private hasToken(): boolean {
    return typeof window !== 'undefined' && !!localStorage.getItem('access_token');
  }

  getUser(): Observable<UserResponse | null> {
    return this.currentUser.asObservable();
  }

  register(request: RegisterRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, request);
  }

  login(request: LoginRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, request).pipe(
      tap(response => {
        this.storageService.setItem('access_token', response.token);
        this.storageService.setItem('user', JSON.stringify(response.user));

        this.isAuthenticated.next(true);
        this.currentUser.next(response.user);
        this.navbarService.setDashboardLinks();
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
      this.storageService.removeItem('access_token');
      this.storageService.removeItem('user');
    }
    this.isAuthenticated.next(false);
    this.currentUser.next(null);
    this.navbarService.resetLinks();
    this.router.navigate(['/home']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  getToken(): string | null {
    return this.storageService.getItem('access_token');
  }

  loadUserFromStorage(): void {
    const user = this.storageService.getItem('user');
    if (user) {
      this.currentUser.next(JSON.parse(user));
    }
  }
}
