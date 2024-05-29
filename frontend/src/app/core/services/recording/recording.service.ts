import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Recording {
  id: number;
  title: string;
  userId: number;
}

@Injectable({
  providedIn: 'root'
})
export class RecordingService {
  private apiUrl = 'http://localhost:8080/api/v1/recordings';

  constructor(private http: HttpClient) {}

  getUserRecordings(userId: number): Observable<Recording[]> {
    return this.http.get<Recording[]>(`${this.apiUrl}/user/${userId}`);
  }

  createRecording(userId: number, recordingData: Recording): Observable<Recording> {
    return this.http.post<Recording>(`${this.apiUrl}/${userId}`, recordingData);
  }

  updateRecording(recordingId: number, recordingData: Recording): Observable<Recording> {
    return this.http.put<Recording>(`${this.apiUrl}/${recordingId}`, recordingData);
  }

  deleteRecording(recordingId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${recordingId}`);
  }
}
