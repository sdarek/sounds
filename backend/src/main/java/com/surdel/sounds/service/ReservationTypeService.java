package com.surdel.sounds.service;

import com.surdel.sounds.model.ReservationType;
import com.surdel.sounds.repository.ReservationTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationTypeService {
    private final ReservationTypeRepository reservationTypeRepository;

    @Autowired
    public ReservationTypeService(ReservationTypeRepository reservationTypeRepository) {
        this.reservationTypeRepository = reservationTypeRepository;
    }

    public List<ReservationType> getAllReservationTypes() {
        return reservationTypeRepository.findAll();
    }

    public ReservationType getReservationTypeById(Integer id) {
        return reservationTypeRepository.findById(id).orElse(null);
    }

    public ReservationType saveReservationType(ReservationType reservationType) {
        return reservationTypeRepository.save(reservationType);
    }

    public void deleteReservationType(Integer id) {
        reservationTypeRepository.deleteById(id);
    }
}
