import { AuthBase, AuthErrors } from "../types/auth.types";

export const validateLogin = (
  email: string,
  password: string,
): AuthErrors => {
  const errors: AuthErrors = {};

  if (!email) {
    errors.email = "Email không được để trống";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Email không hợp lệ";
  }

  if (!password) {
    errors.password = "Mật khẩu không được để trống";
  }

  return errors;
};