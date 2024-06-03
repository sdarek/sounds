package com.surdel.sounds.repository;

import com.surdel.sounds.model.Message;
import com.surdel.sounds.model.Recording;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {
    List<Message> findByRecordingAndIsFinalVersion(Recording recording, boolean isFinalVersion);
}
