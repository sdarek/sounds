import {UserResponse} from "./user.model";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  passwordHash: string;
}

export interface LoginResponse {
  accessToken: string;
  user: UserResponse;
}
