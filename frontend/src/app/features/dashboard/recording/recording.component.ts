import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RecordingResponse} from "../../../core/models/recording.model";
import {MessageResponse} from "../../../core/models/message.model";
import {RecordingService} from "../../../core/services/recording/recording.service";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {UserResponse} from "../../../core/models/user.model";

@Component({
  selector: 'app-recording',
  standalone: true,
  imports: [
    DatePipe,
    FormsModule,
    NgForOf,
    NgIf,
    NgClass
  ],
  templateUrl: './recording.component.html',
  styleUrls: ['./recording.component.scss']
})
export class RecordingComponent implements OnInit {
  recording: RecordingResponse | null = null;
  workingMessages: MessageResponse[] = [];
  finalMessages: MessageResponse[] = [];
  newWorkingMessage: string = '';
  newFinalMessage: string = '';
  currentUser: UserResponse = { id: 1, firstName: 'Jan', lastName: 'Kowalski', email: 'jan.kowalski@example.com' }; // Przykładowy zalogowany użytkownik

  constructor(
    private route: ActivatedRoute,
    private recordingService: RecordingService
  ) {}

  ngOnInit(): void {
    const recordingId = this.route.snapshot.paramMap.get('id');
    if (recordingId) {
      this.loadRecordingDetails(+recordingId);
    }
  }

  private loadRecordingDetails(id: number) {
    this.recordingService.getRecordingById(id).subscribe(recording => {
      this.recording = recording;
      this.workingMessages = recording.messagesWorking;
      this.finalMessages = recording.messagesFinal;
    });
  }

  sendWorkingMessage(): void {
    if (this.newWorkingMessage.trim() && this.recording) {
      const message: MessageResponse = {
        filePath: 'path/to/file', // Wprowadź ścieżkę pliku, jeśli dostępna
        fileType: 'txt', // Wprowadź typ pliku, jeśli dostępny
        messageText: this.newWorkingMessage,
        sentAt: new Date(),
        sender: this.currentUser
      };
      this.workingMessages.push(message);
      this.newWorkingMessage = '';
      // Wywołaj serwis do wysłania wiadomości, jeśli konieczne
    }
  }

  sendFinalMessage(): void {
    if (this.newFinalMessage.trim() && this.recording) {
      const message: MessageResponse = {
        filePath: 'path/to/file', // Wprowadź ścieżkę pliku, jeśli dostępna
        fileType: 'wav', // Wprowadź typ pliku, jeśli dostępny
        messageText: this.newFinalMessage,
        sentAt: new Date(),
        sender: this.currentUser
      };
      this.finalMessages.push(message);
      this.newFinalMessage = '';
      // Wywołaj serwis do wysłania wiadomości, jeśli konieczne
    }
  }

  isSender(sender: UserResponse): boolean {
    return sender.id === this.currentUser.id;
  }

  attachFile(): void {
    // Logika do załączania pliku
  }

  downloadFile(filePath: string): void {
    // Logika do pobierania pliku
  }
}
