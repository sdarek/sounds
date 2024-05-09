import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
register();

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';



interface Recording {
  id: string;
  title: string;
  status: string;
}

@Component({
  selector: 'app-recordings',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './recordings.component.html',
  styleUrl: './recordings.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RecordingsComponent {
  ongoingRecordings: Recording[] = [];
  doneRecordings: Recording[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.loadRecordings();
  }

  loadRecordings(): void {
    this.ongoingRecordings = [
      { id: '1', title: 'Sesja 1', status: 'ongoing' },
      { id: '2', title: 'Sesja 2', status: 'ongoing' },
      { id: '3', title: 'Sesja 3', status: 'ongoing' },
      { id: '4', title: 'Sesja 4', status: 'ongoing' },
      { id: '5', title: 'Sesja 5', status: 'ongoing' },
    ];

    this.doneRecordings = [
      { id: '1', title: 'Cos tam', status: 'done' },
      { id: '2', title: 'Cos tam2', status: 'done' },
      { id: '3', title: 'Cos tam3', status: 'done' },
      { id: '4', title: 'Cos tam4', status: 'done' },
      { id: '5', title: 'Cos tam5', status: 'done' },
      { id: '6', title: 'Cos tam6', status: 'done' },
    ];
  }

  editRecordingSettings(recordingId: string): void {
    console.log('Edycja ustawień dla nagrania o ID:', recordingId);
    // Tutaj można dodać logikę otwarcia dialogu edycji lub przekierowania do strony edycji
  }
}
