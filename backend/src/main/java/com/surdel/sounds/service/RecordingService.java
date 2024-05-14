package com.surdel.sounds.service;

import com.surdel.sounds.model.Recording;
import com.surdel.sounds.repository.RecordingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecordingService {

    @Autowired
    private RecordingRepository recordingRepository;

    public List<Recording> getAllRecordings() {
        return recordingRepository.findAll();
    }

    public Recording getRecordingById(Integer id) {
        return recordingRepository.findById(id).orElse(null);
    }

    public Recording createRecording(Recording recording) {
        return recordingRepository.save(recording);
    }

    public Recording updateRecording(Recording recording) {
        return recordingRepository.save(recording);
    }

    public void deleteRecording(Integer id) {
        recordingRepository.deleteById(id);
    }
}
