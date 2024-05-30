package com.surdel.sounds.controller.recording;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.security.Timestamp;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RecordingResponse {
    @JsonProperty("recording")
    private int recordingId;
    private Timestamp createdAt;
    private String recordingDescription;
    private String status;
    private String recordingTitle;
}
