import { Recording } from './recording.model';
import { User } from './user.model';

export interface Message {
  id?: number;
  recording: Recording;
  sender: User;
  messageText: string;
  filePath: string;
  fileType: string;
  isFinalVersion: boolean;
  sentAt?: string;
}
