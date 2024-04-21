import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

interface ReservationOption {
  title: string;
  duration: string;
}

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class ReservationComponent implements OnInit {
  reservationItems: ReservationOption[] = [
    { title: 'Nagranie muzyczne', duration: '1h' },
    { title: 'Nagranie lektorskie', duration: '1h' },
    { title: 'Sesja fotograficzna', duration: '2h' }
  ];
  
  selectedReservationType?: ReservationOption;
  selectedDate: Date | null = null;

  ngOnInit(): void {}
  onDateSelect(event: Date): void {
    this.selectedDate = event;
    console.log('Wybrano datę:', this.selectedDate);
  }
  

  onReserve(): void {
    console.log('Zarezerwowano:', this.selectedReservationType, 'na datę:', this.selectedDate);
    // Implement further logic to handle the reservation
  }
}
