import { User } from './user.model';

export interface Recording {
  id?: number;
  user: User;
  title: string;
  description: string;
  startDate: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RecordingRequest {
  id: number;
  title: string;
  userId: number;
}

export interface RecordingsResponse {
  recordingId: number;
  description?: string;
  status: string;
  title: string;
}
