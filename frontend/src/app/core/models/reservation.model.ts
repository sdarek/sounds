import { User } from './user.model';
import { Recording } from './recording.model';
import { ReservationType } from './reservation-type.model';

export interface Reservation {
  id?: number;
  user: User;
  reservationType: ReservationType;
  recording: Recording;
  reservationDate: string;
  notes: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ReservationRequest {
  id?: number;
  note: string;
  reservationDate: string;
}

export interface ReservationResponse {
  id: string;
  reservationType: {
    reservationName: string;
    description: string;
  };
  recording: {
    title: string;
  };
  reservationDate: string;
  notes: string;
}
