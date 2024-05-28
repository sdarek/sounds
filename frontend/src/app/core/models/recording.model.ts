import { User } from './user.model';

export interface Recording {
  id?: number;
  user: User;
  title: string;
  description: string;
  startDate: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}
