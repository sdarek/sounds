import { User } from './user.model';

export interface AuditLog {
  id?: number;
  user: User;
  action: string;
  description: string;
  timestamp?: string;
}
