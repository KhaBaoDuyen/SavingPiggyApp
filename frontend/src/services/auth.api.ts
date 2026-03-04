import { API } from "./api";
import { MessageResponse } from "../types/api.types";
import { AuthResponse } from "../types/auth.types";

// gửi OTP
export const sendOtp = (email: string) =>
  API.post<MessageResponse>("/auth/send-otp", { email });

// verify OTP
export const verifyOtp = (email: string, otp: string) =>
  API.post<MessageResponse>("/auth/verify-otp", { email, otp });

// complete register
export const completeRegister = (
  email: string,
  password: string,
  name: string
) =>
  API.post<AuthResponse>("/auth/complete-register", {
    email,
    password,
    name,
  });

// login
export const login = (email: string, password: string) =>
  API.post<AuthResponse>("/auth/login", { email, password });