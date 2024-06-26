export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  passwordHash: string;
  role: string;
  createdAt?: string;
}

export interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}
