import { Component, OnInit } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import {ReservationService} from '../../../core/services/reservation/reservation.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import {ReservationResponse} from "../../../core/models/reservation.model";

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
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {
  reservations: ReservationResponse[] = [];

  constructor(
    private router: Router,
    private reservationService: ReservationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      if (user) {
        this.loadUserReservations(user.id);
      }
    });
  }

  loadUserReservations(userId: number): void {
    this.reservationService.getUserReservations(userId).subscribe(reservations => {
      this.reservations = reservations;
    });
  }

  editReservation(reservationId: string): void {
    this.router.navigate(['/dashboard/reservation/edit', reservationId]);
  }
}
