import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor() { }

  login(email: string, password: string): boolean {
    if(email && password) {
      this.isAuthenticated.next(true);
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }
}
