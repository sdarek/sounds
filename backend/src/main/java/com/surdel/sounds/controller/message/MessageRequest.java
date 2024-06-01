package com.surdel.sounds.controller.message;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MessageRequest {
    private Integer recordingId;
    private Integer senderId;
    private String messageText;
    private String filePath;
    private String fileType;
    private Boolean isFinalVersion;
    private Date sentAt;
}
