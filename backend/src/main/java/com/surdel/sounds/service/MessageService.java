package com.surdel.sounds.service;

import com.surdel.sounds.controller.auth.UserResponse;
import com.surdel.sounds.controller.message.MessageRequest;
import com.surdel.sounds.controller.message.MessageResponse;
import com.surdel.sounds.model.Message;
import com.surdel.sounds.repository.MessageRepository;
import com.surdel.sounds.repository.RecordingRepository;
import com.surdel.sounds.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;
    private final RecordingRepository recordingRepository;
    private final UserRepository userRepository;

    public void createMessage(MessageRequest message) {
        var recording = recordingRepository.findById(message.getRecordingId())
                .orElseThrow(() -> new RuntimeException("Recording not found"));
        var user = userRepository.findById(message.getSenderId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        var newMessage = Message.builder()
                .recording(recording)
                .sender(user)
                .messageText(message.getMessageText())
                .filePath(message.getFilePath())
                .fileType(message.getFileType())
                .isFinalVersion(message.getIsFinalVersion())
                .sentAt(Timestamp.from(Instant.now()))
                .build();
        messageRepository.save(newMessage);
    }
}
