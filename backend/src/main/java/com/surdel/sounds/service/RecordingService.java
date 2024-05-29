package com.surdel.sounds.service;

import com.surdel.sounds.model.Recording;
import com.surdel.sounds.repository.RecordingRepository;
import com.surdel.sounds.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RecordingService {

    private final RecordingRepository recordingRepository;
    private final UserRepository userRepository;

    public Recording createRecording(Integer userId, Recording recordingDetails) {
        var user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        var recording = new Recording();
        recording.setUser(user);
        recording.setTitle(recordingDetails.getTitle());
        recording.setDescription(recordingDetails.getDescription());
        recording.setStartDate(recordingDetails.getStartDate());
        recording.setStatus(recordingDetails.getStatus());
        recording.setCreatedAt(Timestamp.from(Instant.now()));
        recording.setUpdatedAt(Timestamp.from(Instant.now()));
        return recordingRepository.save(recording);
    }

    public List<Recording> getUserRecordings(Integer userId) {
        return recordingRepository.findAll().stream()
                .filter(recording -> recording.getUser().getId().equals(userId))
                .toList();
    }

    public Recording updateRecording(Integer recordingId, Recording recordingDetails) {
        var recording = recordingRepository.findById(recordingId)
                .orElseThrow(() -> new RuntimeException("Recording not found"));
        recording.setTitle(recordingDetails.getTitle());
        recording.setDescription(recordingDetails.getDescription());
        recording.setStartDate(recordingDetails.getStartDate());
        recording.setStatus(recordingDetails.getStatus());
        recording.setUpdatedAt(Timestamp.from(Instant.now()));
        return recordingRepository.save(recording);
    }

    public void deleteRecording(Integer recordingId) {
        var recording = recordingRepository.findById(recordingId)
                .orElseThrow(() -> new RuntimeException("Recording not found"));
        recordingRepository.delete(recording);
    }
}
