package com.surdel.sounds.repository;

import com.surdel.sounds.model.ReservationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationTypeRepository extends JpaRepository<ReservationType, Integer> {
}
