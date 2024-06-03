package com.surdel.sounds.controller.recording;

import com.surdel.sounds.model.Recording;
import com.surdel.sounds.service.RecordingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/recordings")
@RequiredArgsConstructor
public class RecordingController {

    private final RecordingService recordingService;

    @PostMapping("/{userId}")
    public ResponseEntity<RecordingsResponse> createRecording(
            @PathVariable Integer userId,
            @RequestBody Recording recordingDetails) {
        return ResponseEntity.ok(recordingService.createRecording(userId, recordingDetails));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<RecordingsResponse>> getUserRecordings(@PathVariable Integer userId) {
        return ResponseEntity.ok(recordingService.getUserRecordings(userId));
    }

    @GetMapping("/user/{userId}/ongoing")
    public ResponseEntity<List<RecordingsResponse>> getOngoingRecordings(@PathVariable Integer userId) {
        return ResponseEntity.ok(recordingService.getOngoingRecordings(userId));
    }

    @GetMapping("/user/{userId}/done")
    public ResponseEntity<List<RecordingsResponse>> getDoneRecordings(@PathVariable Integer userId) {
        return ResponseEntity.ok(recordingService.getDoneRecordings(userId));
    }

    @GetMapping("/{recordingId}")
    public ResponseEntity<RecordingResponse> getRecording(@PathVariable Integer recordingId) {
        return ResponseEntity.ok(recordingService.getRecording(recordingId));
    }

    @PutMapping("/{recordingId}")
    public ResponseEntity<Recording> updateRecording(
            @PathVariable Integer recordingId,
            @RequestBody Recording recordingDetails) {
        return ResponseEntity.ok(recordingService.updateRecording(recordingId, recordingDetails));
    }

    @DeleteMapping("/{recordingId}")
    public ResponseEntity<Void> deleteRecording(@PathVariable Integer recordingId) {
        recordingService.deleteRecording(recordingId);
        return ResponseEntity.noContent().build();
    }
}
