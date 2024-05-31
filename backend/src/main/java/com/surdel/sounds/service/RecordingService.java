package com.surdel.sounds.service;

import com.surdel.sounds.controller.auth.UserResponse;
import com.surdel.sounds.controller.message.MessageResponse;
import com.surdel.sounds.controller.recording.RecordingResponse;
import com.surdel.sounds.controller.recording.RecordingsResponse;
import com.surdel.sounds.model.Message;
import com.surdel.sounds.model.Recording;
import com.surdel.sounds.repository.MessageRepository;
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
    private final MessageRepository messageRepository;

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

    public RecordingResponse getRecording(Integer recordingId) {
        var recording = recordingRepository.findById(recordingId).orElseThrow(() -> new RuntimeException("Recording not found"));
        var messagesWorking = messageRepository.findByRecordingAndIsFinalVersion(recording, false);
        var messagesFinal = messageRepository.findByRecordingAndIsFinalVersion(recording, true);

        return RecordingResponse.builder()
                .recordingId(recording.getId())
                .createdAt(recording.getCreatedAt())
                .description(recording.getDescription())
                .startDate(recording.getStartDate())
                .status(recording.getStatus())
                .title(recording.getTitle())
                .messagesWorking(messagesWorking.stream()
                        .map(this::toMessageResponse)
                        .toArray(MessageResponse[]::new))
                .messagesFinal(messagesFinal.stream()
                        .map(this::toMessageResponse)
                        .toArray(MessageResponse[]::new))
                .build();
    }

    private MessageResponse toMessageResponse(Message message) {
        var user = message.getSender();
        return MessageResponse.builder()
                .filePath(message.getFilePath())
                .fileType(message.getFileType())
                .messageText(message.getMessageText())
                .sentAt(message.getSentAt())
                .sender(UserResponse.builder()
                        .id(user.getId())
                        .email(user.getEmail())
                        .firstName(user.getFirstName())
                        .lastName(user.getLastName())
                        .role(String.valueOf(user.getRole()))
                        .build())
                .build();
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
