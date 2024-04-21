import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable  } from 'rxjs';

export interface NavLink {
  label: string;
  path: string;
}

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private navLinks = new BehaviorSubject<NavLink[]>([
    { label: 'Strona Główna', path: '/home' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Wyposażenie', path: '/equipment' },
    { label: 'Oferta', path: '/offer' },
    { label: 'Kontakt', path: '/contact' },
    { label: 'Rezerwacja', path: '/reservation' },
    { label: 'Logowanie', path: '/login' }
  ]);

  constructor() { }

  getLinks(): Observable<NavLink[]> {
    return this.navLinks.asObservable();
  }

  updateLinks(links: NavLink[]): void {
    this.navLinks.next(links);
  }
}
