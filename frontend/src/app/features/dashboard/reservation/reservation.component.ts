import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
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
    ReactiveFormsModule,
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
  reservationForm: FormGroup;

  reservationItems: ReservationOption[] = [
    { title: 'Nagranie muzyczne', duration: '1h' },
    { title: 'Nagranie lektorskie', duration: '1h' },
    { title: 'Sesja fotograficzna', duration: '2h' }
  ];
  selectedReservationType?: ReservationOption;
  selectedDate: Date | null = null;

  constructor() {
    this.reservationForm = new FormGroup({
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      note: new FormControl(''),
      reservationType: new FormControl(null, [Validators.required]),
      reservationDate: new FormControl(new Date(), [Validators.required])
    });
  }

  ngOnInit(): void {}
  onDateSelect(event: Date): void {
    this.selectedDate = event;
    console.log('Wybrano datę:', this.selectedDate);
  }
  

  onReserve(): void {
    if (this.reservationForm.valid) {
      console.log('Form Data:', this.reservationForm.value);
      // Implement further logic to handle the reservation
    } else {
      console.log('Form is not valid!');
    }
  }
}
