package com.surdel.sounds.controller.message;

import com.surdel.sounds.model.Message;
import com.surdel.sounds.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/messages")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;

    @PostMapping
    public ResponseEntity<Void> createMessage(@RequestBody MessageRequest message) {
        messageService.createMessage(message);
        return ResponseEntity.noContent().build();
    }

}
