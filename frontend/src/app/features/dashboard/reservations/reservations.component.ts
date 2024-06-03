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
  userId: number | null = null;

  constructor(
    private router: Router,
    private reservationService: ReservationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      if (user) {
        this.loadUserReservations(user.id);
        this.userId = user.id;
      }
    });
  }

  loadUserReservations(userId: number): void {
    this.reservationService.getUserReservations(userId).subscribe(reservations => {
      this.reservations = reservations;
    });
  }

  editReservation(reservationId: string): void {
    console.log(reservationId);
    this.router.navigate(['/dashboard/reservation/edit', reservationId]);
  }

  deleteReservation(reservationId: number) {
    console.log(reservationId);
    this.reservationService.deleteReservation(reservationId).subscribe({
      next: () => {
        console.log('Reservation deleted successfully')
        if(this.userId)
        this.loadUserReservations(this.userId);
      },
      error: (err) => console.error('Error deleting reservation:', err)
    });
  }

  showRecording(recordingId: number) {
    console.log(recordingId);
    this.router.navigate(['/dashboard/recordings', recordingId]);
  }
}
