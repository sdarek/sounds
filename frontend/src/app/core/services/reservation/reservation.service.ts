import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservationType } from "../../models/reservation-type.model";
import {ReservationRequest, ReservationResponse} from "../../models/reservation.model";


@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:8080/api/v1/reservations';

  constructor(private http: HttpClient) {}

  getReservationTypes(): Observable<ReservationType[]> {
    return this.http.get<ReservationType[]>(`${this.apiUrl}/types`);
  }

  getUserReservations(userId: number): Observable<ReservationResponse[]> {
    return this.http.get<ReservationResponse[]>(`${this.apiUrl}/user/${userId}`);
  }

  createReservation(userId: number, reservationTypeId: number, recordingId: number, reservationData: { reservationDate: string, notes: string }): Observable<ReservationRequest> {
    return this.http.post<ReservationRequest>(`${this.apiUrl}/${userId}/${reservationTypeId}/${recordingId}`, reservationData);
  }

  updateReservation(reservationId: number, reservationTypeId: number, recordingId: number, reservationData: { reservationDate: string, note: string }): Observable<ReservationRequest> {
    return this.http.put<ReservationRequest>(`${this.apiUrl}/${reservationId}/${reservationTypeId}/${recordingId}`, reservationData);
  }

  deleteReservation(reservationId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${reservationId}`);
  }
}
