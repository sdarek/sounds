package com.surdel.sounds.service;

import com.surdel.sounds.controller.recording.RecordingsResponse;
import com.surdel.sounds.model.Recording;
import com.surdel.sounds.repository.RecordingRepository;
import com.surdel.sounds.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecordingService {

    private final RecordingRepository recordingRepository;
    private final UserRepository userRepository;

    public RecordingsResponse createRecording(Integer userId, Recording recordingDetails) {
        var user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        var recording = new Recording();
        recording.setUser(user);
        recording.setTitle(recordingDetails.getTitle());
        recording.setDescription(recordingDetails.getDescription());
        recording.setStartDate(recordingDetails.getStartDate());
        recording.setStatus("ongoing");
        recording.setCreatedAt(Timestamp.from(Instant.now()));
        recording.setUpdatedAt(Timestamp.from(Instant.now()));
        recordingRepository.save(recording);

        return RecordingsResponse.builder()
                .recordingId(recording.getId())
                .description(recording.getDescription())
                .status(recording.getStatus())
                .title(recording.getTitle())
                .build();
    }

    public List<RecordingsResponse> getUserRecordings(Integer userId) {
        return recordingRepository.findAll().stream()
                .filter(recording -> recording.getUser().getId().equals(userId))
                .map(recording -> RecordingsResponse.builder()
                        .recordingId(recording.getId())
                        .description(recording.getDescription())
                        .status(recording.getStatus())
                        .title(recording.getTitle())
                        .build())
                .collect(Collectors.toList());
    }


    public List<RecordingsResponse> getOngoingRecordings(Integer userId) {
        return getUserRecordings(userId).stream()
                .filter(recording -> "ongoing".equals(recording.getStatus()))
                .collect(Collectors.toList());
    }

    public List<RecordingsResponse> getDoneRecordings(Integer userId) {
        return getUserRecordings(userId).stream()
                .filter(recording -> "done".equals(recording.getStatus()))
                .collect(Collectors.toList());
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
