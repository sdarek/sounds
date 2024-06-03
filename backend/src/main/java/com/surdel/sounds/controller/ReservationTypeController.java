package com.surdel.sounds.controller;

import com.surdel.sounds.model.ReservationType;
import com.surdel.sounds.service.ReservationTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/reservations/types")
public class ReservationTypeController {

    private final ReservationTypeService reservationTypeService;

    @Autowired
    public ReservationTypeController(ReservationTypeService reservationTypeService) {
        this.reservationTypeService = reservationTypeService;
    }

    @GetMapping
    public List<ReservationType> getAllReservationTypes() {
        return reservationTypeService.getAllReservationTypes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservationType> getReservationTypeById(@PathVariable Integer id) {
        ReservationType reservationType = reservationTypeService.getReservationTypeById(id);
        if (reservationType == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(reservationType);
    }

    @PostMapping
    public ReservationType createReservationType(@RequestBody ReservationType reservationType) {
        return reservationTypeService.saveReservationType(reservationType);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReservationType(@PathVariable Integer id) {
        reservationTypeService.deleteReservationType(id);
        return ResponseEntity.noContent().build();
    }
}
