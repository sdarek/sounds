package com.surdel.sounds.service;

import com.surdel.sounds.model.Recording;
import com.surdel.sounds.model.Reservation;
import com.surdel.sounds.model.User;
import com.surdel.sounds.repository.RecordingRepository;
import com.surdel.sounds.repository.ReservationRepository;
import com.surdel.sounds.repository.UserRepository;
import com.surdel.sounds.repository.ReservationTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final ReservationTypeRepository reservationTypeRepository;
    private final RecordingRepository recordingRepository;

    public Reservation createReservation(Integer userId, Integer reservationTypeId, Integer recordingId, Reservation reservationDetails) {
        var user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        var reservationType = reservationTypeRepository.findById(reservationTypeId).orElseThrow(() -> new RuntimeException("Reservation type not found"));
        var recording = recordingRepository.findById(recordingId).orElseGet(() -> createNewRecording(user));

        var reservation = new Reservation();
        reservation.setUser(user);
        reservation.setReservationType(reservationType);
        reservation.setRecording(recording);
        reservation.setReservationDate(reservationDetails.getReservationDate());
        reservation.setNotes(reservationDetails.getNotes());
        reservation.setCreatedAt(Timestamp.from(Instant.now()));
        reservation.setUpdatedAt(Timestamp.from(Instant.now()));

        return reservationRepository.save(reservation);
    }

    private Recording createNewRecording(User user) {
        var recording = new Recording();
        recording.setUser(user);
        recording.setTitle("New Recording");
        recording.setDescription("Automatically created recording");
        recording.setStartDate(Timestamp.from(Instant.now()));
        recording.setStatus("New");
        recording.setCreatedAt(Timestamp.from(Instant.now()));
        recording.setUpdatedAt(Timestamp.from(Instant.now()));
        return recordingRepository.save(recording);
    }

    public List<Reservation> getUserReservations(Integer userId) {
        return reservationRepository.findByUserId(userId);
    }

    public Reservation updateReservation(Integer reservationId, Integer reservationTypeId, Integer recordingId, Reservation reservationDetails) {
        var reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));
        var reservationType = reservationTypeRepository.findById(reservationTypeId).orElseThrow(() -> new RuntimeException("Reservation type not found"));
        var recording = recordingRepository.findById(recordingId).orElseThrow(() -> new RuntimeException("Recording not found"));

        reservation.setReservationType(reservationType);
        reservation.setRecording(recording);
        reservation.setReservationDate(reservationDetails.getReservationDate());
        reservation.setNotes(reservationDetails.getNotes());
        reservation.setUpdatedAt(Timestamp.from(Instant.now()));

        return reservationRepository.save(reservation);
    }

    public void deleteReservation(Integer reservationId) {
        var reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));
        reservationRepository.delete(reservation);
    }
}
