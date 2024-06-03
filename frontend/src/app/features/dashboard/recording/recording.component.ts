import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { RecordingResponse } from "../../../core/models/recording.model";
import { Message, MessageRequest, MessageResponse } from "../../../core/models/message.model";
import { RecordingService } from "../../../core/services/recording/recording.service";
import { MessageService } from "../../../core/services/message/message.service";
import { StorageService } from "../../../core/services/storage/storage.service";
import { DatePipe, NgClass, NgForOf, NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { UserResponse } from "../../../core/models/user.model";

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
export class RecordingComponent implements OnInit, AfterViewInit {
  recording: RecordingResponse | null = null;
  workingMessages: MessageResponse[] = [];
  finalMessages: MessageResponse[] = [];
  newWorkingMessage: string = '';
  newFinalMessage: string = '';
  currentUser: UserResponse | null = null;
  selectedFile: File | null = null;

  @ViewChild('workingFileInput') workingFileInput!: ElementRef;
  @ViewChild('finalFileInput') finalFileInput!: ElementRef;
  @ViewChild('workingMessagesContainer') workingMessagesContainer!: ElementRef;
  @ViewChild('finalMessagesContainer') finalMessagesContainer!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private recordingService: RecordingService,
    private messageService: MessageService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.getCurrentUser();
    const recordingId = this.route.snapshot.paramMap.get('id');
    if (recordingId) {
      this.loadRecordingDetails(+recordingId);
    }
  }

  ngAfterViewInit(): void {
    this.scrollToBottom(this.workingMessagesContainer);
    this.scrollToBottom(this.finalMessagesContainer);
  }

  private getCurrentUser(): UserResponse | null {
    const user = this.storageService.getUser();
    return user ? JSON.parse(user) : null;
  }

  private loadRecordingDetails(id: number) {
    this.recordingService.getRecordingById(id).subscribe(recording => {
      this.recording = recording;
      this.workingMessages = recording.messagesWorking;
      this.finalMessages = recording.messagesFinal;
      this.scrollToBottom(this.workingMessagesContainer);
      this.scrollToBottom(this.finalMessagesContainer);
    });
  }

  private scrollToBottom(element: ElementRef): void {
    try {
      setTimeout(() => {
        element.nativeElement.scrollTop = element.nativeElement.scrollHeight;
      }, 0);
    } catch (err) {
      console.error('Could not scroll to bottom:', err);
    }
  }

  sendWorkingMessage(): void {
    if (this.newWorkingMessage.trim() && this.recording && this.currentUser) {
      const message: MessageRequest = {
        recordingId: this.recording.recordingId!,
        senderId: this.currentUser.id,
        messageText: this.newWorkingMessage,
        filePath: this.selectedFile ? this.selectedFile.name : '',
        fileType: this.selectedFile ? this.selectedFile.type : 'txt',
        isFinalVersion: false,
        sentAt: new Date().toISOString()
      };

      this.messageService.createMessage(message).subscribe(() => {
        this.workingMessages.push({
          filePath: message.filePath,
          fileType: message.fileType,
          messageText: message.messageText,
          sentAt: new Date(message.sentAt),
          sender: this.currentUser!
        });
        this.newWorkingMessage = '';
        this.selectedFile = null; // Clear the selected file after sending
        this.scrollToBottom(this.workingMessagesContainer);
      });
    }
  }

  sendFinalMessage(): void {
    if (this.newFinalMessage.trim() && this.recording && this.currentUser) {
      const message: MessageRequest = {
        recordingId: this.recording.recordingId!,
        senderId: this.currentUser.id,
        messageText: this.newFinalMessage,
        filePath: this.selectedFile ? this.selectedFile.name : '',
        fileType: this.selectedFile ? this.selectedFile.type : 'wav',
        isFinalVersion: true,
        sentAt: new Date().toISOString()
      };

      this.messageService.createMessage(message).subscribe(() => {
        this.finalMessages.push({
          filePath: message.filePath,
          fileType: message.fileType,
          messageText: message.messageText,
          sentAt: new Date(message.sentAt),
          sender: this.currentUser!
        });
        this.newFinalMessage = '';
        this.selectedFile = null; // Clear the selected file after sending
        this.scrollToBottom(this.finalMessagesContainer);
      });
    }
  }

  isSender(sender: UserResponse): boolean {
    return this.currentUser ? sender.id === this.currentUser.id : false;
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  attachFile(): void {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.onchange = (event: any) => {
      this.onFileSelected(event);
    };
    fileInput.click();
  }

  downloadFile(filePath: string): void {
    const link = document.createElement('a');
    link.href = filePath;
    link.download = filePath.substring(filePath.lastIndexOf('/') + 1);
    link.click();
  }
}
