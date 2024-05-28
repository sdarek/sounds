import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuditLog } from '../../models/audit-log.model';

@Injectable({
  providedIn: 'root'
})
export class AuditLogService {
  private apiUrl = 'http://localhost:8080/api/audit-logs';

  constructor(private http: HttpClient) {}

  getAllAuditLogs(): Observable<AuditLog[]> {
    return this.http.get<AuditLog[]>(this.apiUrl);
  }

  getAuditLogById(id: number): Observable<AuditLog> {
    return this.http.get<AuditLog>(`${this.apiUrl}/${id}`);
  }

  createAuditLog(auditLog: AuditLog): Observable<AuditLog> {
    return this.http.post<AuditLog>(this.apiUrl, auditLog);
  }

  updateAuditLog(id: number, auditLog: AuditLog): Observable<AuditLog> {
    return this.http.put<AuditLog>(`${this.apiUrl}/${id}`, auditLog);
  }

  deleteAuditLog(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
