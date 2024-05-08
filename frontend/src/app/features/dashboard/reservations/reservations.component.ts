import { Component } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

interface Reservation {
  id: string;
  type: string;
  date: Date;
  time: string;
  address: string;
  cost: number;
}

@Component({
  selector: 'app-reservations',
  standalone: true,
    imports: [
      MatButton,
      RouterLink,
      CommonModule,
      MatButtonModule,
      MatIconModule
    ],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.scss'
})
export class ReservationsComponent {
  reservations: Reservation[] = [
    { id: '1', type: 'Nagranie muzyczne', date: new Date(), time: '15:00', address: 'Warszawa, ul. Muzyczna 1', cost: 200 },
  ];

  constructor(private router: Router) {}

  editReservation(reservationId: string): void {
    this.router.navigate(['/reservation/edit', reservationId]);
  }
}
