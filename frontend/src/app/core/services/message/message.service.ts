import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message, MessageRequest, MessageResponse } from '../../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = 'http://localhost:8080/api/v1/messages';

  constructor(private http: HttpClient) {}

  getMessagesByRecordingId(recordingId: number): Observable<{
    messagesWorking: MessageResponse[],
    messagesFinal: MessageResponse[]
  }> {
    return this.http.get<{
      messagesWorking: MessageResponse[],
      messagesFinal: MessageResponse[]
    }>(`${this.apiUrl}/recording/${recordingId}`);
  }

  getAllMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.apiUrl);
  }

  getMessageById(id: number): Observable<Message> {
    return this.http.get<Message>(`${this.apiUrl}/${id}`);
  }

  createMessage(message: MessageRequest): Observable<void> {
    return this.http.post<void>(this.apiUrl, message);
  }

  updateMessage(id: number, message: Message): Observable<Message> {
    return this.http.put<Message>(`${this.apiUrl}/${id}`, message);
  }

  deleteMessage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
