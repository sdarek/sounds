import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservationType } from '../../models/reservation-type.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationTypeService {
  private apiUrl = 'http://localhost:8080/api/reservation-types';

  constructor(private http: HttpClient) {}

  getAllReservationTypes(): Observable<ReservationType[]> {
    return this.http.get<ReservationType[]>(this.apiUrl);
  }

  getReservationTypeById(id: number): Observable<ReservationType> {
    return this.http.get<ReservationType>(`${this.apiUrl}/${id}`);
  }

  createReservationType(reservationType: ReservationType): Observable<ReservationType> {
    return this.http.post<ReservationType>(this.apiUrl, reservationType);
  }

  updateReservationType(id: number, reservationType: ReservationType): Observable<ReservationType> {
    return this.http.put<ReservationType>(`${this.apiUrl}/${id}`, reservationType);
  }

  deleteReservationType(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
