// Base
export interface AuthBase {
  email: string;
  password: string;
}

// Login
export interface LoginForm extends AuthBase { }

// Register
export interface RegisterForm extends AuthBase {
  confirmPassword: string;
}

export interface OtpForm extends AuthBase {
  otp: string;
}

// Errors
export interface AuthErrors {
  email?: string;
  password?: string;
  name?: string;
  confirmPassword?: string;
  otp?: string;
}