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
import { MatDialog } from '@angular/material/dialog';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ReservationService } from '../../../core/services/reservation/reservation.service';
import { RecordingService } from '../../../core/services/recording/recording.service';
import { NewRecordingDialogComponent } from '../new-recording-dialog/new-recording-dialog.component';
import { AuthService } from '../../../core/services/auth/auth.service';
import {UserResponse} from "../../../core/models/user.model";
import {ReservationType} from "../../../core/models/reservation-type.model";
import {RecordingsResponse} from "../../../core/models/recording.model";
import {Router} from "@angular/router";

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
    MatNativeDateModule,
    NgxMaterialTimepickerModule
  ]
})
export class ReservationComponent implements OnInit {
  reservationForm: FormGroup;
  reservationTypes: ReservationType[] = [];
  recordings: RecordingsResponse[] = [];
  user: UserResponse | null = null;

  constructor(
    private reservationService: ReservationService,
    private recordingService: RecordingService,
    private authService: AuthService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.reservationForm = new FormGroup({
      note: new FormControl(''),
      reservationType: new FormControl(null, [Validators.required]),
      recording: new FormControl(null, [Validators.required]),
      reservationDate: new FormControl(new Date(), [Validators.required]),
      reservationTime: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      if (user) {
        this.user = user;
        // @ts-ignore
        this.loadRecordings(this.user.id);
      }
    });

    this.loadReservationTypes();
  }

  loadReservationTypes(): void {
    this.reservationService.getReservationTypes().subscribe(types => {
      this.reservationTypes = types;
    });
  }

  loadRecordings(userId: number): void {
    this.recordingService.getUserRecordings(userId).subscribe(recordings => {
      this.recordings = recordings;
      console.log(recordings);
    }, error => {
      console.error('Failed to load recordings', error);
    });
  }

  onDateSelect(event: Date): void {
    this.reservationForm.controls['reservationDate'].setValue(event);
  }

  openNewRecordingDialog(): void {
    const dialogRef = this.dialog.open(NewRecordingDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.user) {
        this.recordingService.createRecording(this.user.id, result).subscribe(newRecording => {
          this.recordings.push(newRecording);
          console.log(newRecording);
          this.reservationForm.controls['recording'].setValue(newRecording.recordingId);
        });
      }
    });
  }

  onReserve(): void {
    if (this.reservationForm.valid && this.user) {
      const formData = this.reservationForm.value;
      const reservationDate = new Date(formData.reservationDate);

      const [hours, minutes] = formData.reservationTime.split(':');
      reservationDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));

      const reservationData = {
        reservationDate: reservationDate.toISOString(),
        notes: formData.note
      };

      this.reservationService.createReservation(this.user.id, formData.reservationType, formData.recording, reservationData).subscribe(response => {
        console.log('Reservation successful', response);
        console.log(reservationData);
        this.router.navigate(['/dashboard/reservations']);
        // Implement further logic to handle successful reservation
      }, error => {
        console.error('Reservation failed', error);
      });
    } else {
      console.log('Form is not valid or user is not logged in!');
    }
  }
}
