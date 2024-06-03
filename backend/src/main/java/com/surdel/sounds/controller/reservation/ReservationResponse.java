package com.surdel.sounds.controller.reservation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReservationResponse {
    private Integer id;
    private Timestamp reservationDate;
    private String notes;
    private ReservationTypeResponse reservationType;
    private RecordingResponse recording;
}
