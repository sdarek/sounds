package com.surdel.sounds.controller.recording;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RecordingsResponse {
    private int recordingId;
    private String description;
    private String status;
    private String title;
}
