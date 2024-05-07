/*auth.service.ts*/
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError  } from 'rxjs';
import { Router } from "@angular/router";
import { NavbarService } from "../navbar/navbar.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private navbarService: NavbarService) {}

  login(email: string, password: string): Observable<any> {
    // Symulacja odpowiedzi serwera
    if (email === 'user@user.com' && password === 'haslo123') {
      this.isAuthenticated.next(true);
      this.router.navigate(['/dashboard']); // Przekierowanie do dashboardu
      return of({ success: true, message: "Login successful" }); // Symulacja pozytywnej odpowiedzi serwera
    } else {
      return throwError(() => new Error('Invalid email or password')); // Symulacja błędu serwera
    }
  }

  logout(): void {
    this.isAuthenticated.next(false);
    this.router.navigate(['/home']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }
}
