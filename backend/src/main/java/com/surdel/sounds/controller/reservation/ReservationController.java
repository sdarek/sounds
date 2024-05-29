package com.surdel.sounds.controller.reservation;

import com.surdel.sounds.model.Reservation;
import com.surdel.sounds.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    @PostMapping("/{userId}/{reservationTypeId}/{recordingId}")
    public ResponseEntity<Reservation> createReservation(
            @PathVariable Integer userId,
            @PathVariable Integer reservationTypeId,
            @PathVariable Integer recordingId,
            @RequestBody Reservation reservationDetails) {
        return ResponseEntity.ok(reservationService.createReservation(userId, reservationTypeId, recordingId, reservationDetails));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Reservation>> getUserReservations(@PathVariable Integer userId) {
        return ResponseEntity.ok(reservationService.getUserReservations(userId));
    }

    @PutMapping("/{reservationId}/{reservationTypeId}/{recordingId}")
    public ResponseEntity<Reservation> updateReservation(
            @PathVariable Integer reservationId,
            @PathVariable Integer reservationTypeId,
            @PathVariable Integer recordingId,
            @RequestBody Reservation reservationDetails) {
        return ResponseEntity.ok(reservationService.updateReservation(reservationId, reservationTypeId, recordingId, reservationDetails));
    }

    @DeleteMapping("/{reservationId}")
    public ResponseEntity<Void> deleteReservation(@PathVariable Integer reservationId) {
        reservationService.deleteReservation(reservationId);
        return ResponseEntity.noContent().build();
    }
}
