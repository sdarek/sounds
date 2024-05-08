import { Component } from '@angular/core';
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
  styleUrl: './recordings.component.scss'
})
export class RecordingsComponent {
  ongoingRecordings: Recording[] = [];
  doneRecordings: Recording[] = [];
  constructor() {}

  ngOnInit(): void {
    this.loadRecordings();
  }

  loadRecordings(): void {
    this.ongoingRecordings = [
      { id: '1', title: 'Nagranie Jazzowe', status: 'ongoing' },
      { id: '2', title: 'Sesja Rockowa', status: 'ongoing' },
      { id: '2', title: 'Sesja Rockowa', status: 'ongoing' },
      { id: '2', title: 'Sesja Rockowa', status: 'ongoing' }
    ];

    this.doneRecordings = [
      { id: '3', title: 'Koncert Klasyczny', status: 'done' },
      { id: '4', title: 'Operetka', status: 'done' }
    ];
  }

  editRecordingSettings(recordingId: string): void {
    console.log('Edycja ustawień dla nagrania o ID:', recordingId);
    // Tutaj można dodać logikę otwarcia dialogu edycji lub przekierowania do strony edycji
  }
}
