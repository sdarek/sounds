import { Recording } from './recording.model';
import {User, UserResponse} from './user.model';

export interface Message {
  id?: number;
  recordingId: number;
  senderId: number;
  messageText: string;
  filePath: string;
  fileType: string;
  isFinalVersion: boolean;
  sentAt: string;
}

export interface MessageResponse {
  filePath: string;
  fileType: string;
  messageText: string;
  sentAt: Date;
  sender: UserResponse
}

export interface MessageRequest {
  recordingId: number;
  senderId: number;
  messageText: string;
  filePath: string;
  fileType: string;
  isFinalVersion: boolean;
  sentAt: string;
}
