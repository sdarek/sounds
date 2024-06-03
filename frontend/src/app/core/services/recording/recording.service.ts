import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {RecordingRequest, RecordingResponse, RecordingsResponse} from "../../models/recording.model";


@Injectable({
  providedIn: 'root'
})
export class RecordingService {
  private apiUrl = 'http://localhost:8080/api/v1/recordings';

  constructor(private http: HttpClient) {}

  getUserRecordings(userId: number): Observable<RecordingsResponse[]> {
    return this.http.get<RecordingsResponse[]>(`${this.apiUrl}/user/${userId}`);
  }

  getOngoingRecordings(userId: number): Observable<RecordingsResponse[]> {
    return this.http.get<RecordingsResponse[]>(`${this.apiUrl}/user/${userId}/ongoing`);
  }

  getDoneRecordings(userId: number): Observable<RecordingsResponse[]> {
    return this.http.get<RecordingsResponse[]>(`${this.apiUrl}/user/${userId}/done`);
  }

  createRecording(userId: number, recordingData: RecordingRequest): Observable<RecordingsResponse> {
    return this.http.post<RecordingsResponse>(`${this.apiUrl}/${userId}`, recordingData);
  }

  getRecordingById(id: number): Observable<RecordingResponse> {
    return this.http.get<RecordingResponse>(`${this.apiUrl}/${id}`)
  }

  updateRecording(recordingId: number, recordingData: RecordingRequest): Observable<RecordingRequest> {
    return this.http.put<RecordingRequest>(`${this.apiUrl}/${recordingId}`, recordingData);
  }

  deleteRecording(recordingId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${recordingId}`);
  }
}
