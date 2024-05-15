import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recording } from '../../models/recording.model';

@Injectable({
  providedIn: 'root'
})
export class RecordingService {
  private apiUrl = 'http://localhost:8080/api/recordings';

  constructor(private http: HttpClient) {}

  getAllRecordings(): Observable<Recording[]> {
    return this.http.get<Recording[]>(this.apiUrl);
  }

  getRecordingById(id: number): Observable<Recording> {
    return this.http.get<Recording>(`${this.apiUrl}/${id}`);
  }

  createRecording(recording: Recording): Observable<Recording> {
    return this.http.post<Recording>(this.apiUrl, recording);
  }

  updateRecording(id: number, recording: Recording): Observable<Recording> {
    return this.http.put<Recording>(`${this.apiUrl}/${id}`, recording);
  }

  deleteRecording(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
