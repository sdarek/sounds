package com.surdel.sounds.controller.message;

import com.surdel.sounds.controller.auth.UserResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MessageResponse {
    private String filePath;
    private String fileType;
    private String messageText;
    private Timestamp sentAt;
    private UserResponse sender;
}
