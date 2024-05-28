package com.surdel.sounds.service;

import com.surdel.sounds.model.AuditLog;
import com.surdel.sounds.repository.AuditLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuditLogService {

    @Autowired
    private AuditLogRepository auditLogRepository;

    public List<AuditLog> getAllAuditLogs() {
        return auditLogRepository.findAll();
    }

    public AuditLog getAuditLogById(Integer id) {
        return auditLogRepository.findById(id).orElse(null);
    }

    public AuditLog createAuditLog(AuditLog auditLog) {
        return auditLogRepository.save(auditLog);
    }

    public AuditLog updateAuditLog(AuditLog auditLog) {
        return auditLogRepository.save(auditLog);
    }

    public void deleteAuditLog(Integer id) {
        auditLogRepository.deleteById(id);
    }
}
