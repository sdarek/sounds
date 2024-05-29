import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ReservationType {
  id: number;
  typeName: string;
}

export interface Reservation {
  id?: number;
  note: string;
  reservationDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:8080/api/v1/reservations';

  constructor(private http: HttpClient) {}

  getReservationTypes(): Observable<ReservationType[]> {
    return this.http.get<ReservationType[]>(`${this.apiUrl}/types`);
  }

  getUserReservations(userId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/user/${userId}`);
  }

  createReservation(userId: number, reservationTypeId: number, recordingId: number, reservationData: { reservationDate: string, notes: string }): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.apiUrl}/${userId}/${reservationTypeId}/${recordingId}`, reservationData);
  }

  updateReservation(reservationId: number, reservationTypeId: number, recordingId: number, reservationData: { reservationDate: string, note: string }): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.apiUrl}/${reservationId}/${reservationTypeId}/${recordingId}`, reservationData);
  }

  deleteReservation(reservationId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${reservationId}`);
  }
}
