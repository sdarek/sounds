package com.surdel.sounds.controller.recording;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.surdel.sounds.controller.message.MessageResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RecordingResponse {
    private int recordingId;
    private Timestamp createdAt;
    private String description;
    private Timestamp startDate;
    private String status;
    private String title;
    private MessageResponse[] messagesWorking;
    private MessageResponse[] messagesFinal;
}
