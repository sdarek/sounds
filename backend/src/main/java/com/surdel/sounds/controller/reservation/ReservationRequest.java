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
public class ReservationRequest {
    private String notes;
    private Timestamp reservationDate;
    private Integer recordingId;
    private Integer reservationTypeId;
    private Integer userId;
}