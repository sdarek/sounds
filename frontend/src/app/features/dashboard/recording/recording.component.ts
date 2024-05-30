import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RecordingResponse} from "../../../core/models/recording.model";
import {MessageResponse} from "../../../core/models/message.model";
import {RecordingService} from "../../../core/services/recording/recording.service";

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

}
