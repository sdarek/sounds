import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RecordingResponse} from "../../../core/models/recording.model";
import {MessageResponse} from "../../../core/models/message.model";
import {RecordingService} from "../../../core/services/recording/recording.service";
import {MessageService} from "../../../core/services/message/message.service";

@Component({
  selector: 'app-recording',
  standalone: true,
  imports: [],
  templateUrl: './recording.component.html',
  styleUrl: './recording.component.scss'
})
export class RecordingComponent implements OnInit {
  recording: RecordingResponse | null = null;
  workingMessages: MessageResponse[] = [];
  finalMessages: MessageResponse[] = [];

  constructor(
    private route: ActivatedRoute,
    private recordingService: RecordingService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const recordingId = this.route.snapshot.paramMap.get('id');
    if (recordingId) {
      this.loadRecordingDetails(+recordingId);
      this.loadMessagesDetails(+recordingId);
    }
  }

  private loadRecordingDetails(id: number) {
    this.recordingService.getRecordingById(id).subscribe(recording => {
      this.recording = recording;
    });
  }

  private loadMessagesDetails(id: number) {
    this.messageService.getMessagesByRecordingId(id).subscribe(messages => {
      this.workingMessages = messages.messagesWorking;
      this.finalMessages = messages.messagesFinal;
    });
  }
}
