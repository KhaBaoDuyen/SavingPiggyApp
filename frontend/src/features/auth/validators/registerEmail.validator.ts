import { AuthBase, AuthErrors } from "../types/auth.types";

export const validateEmail = (
  email: string,
): AuthErrors => {
  const errors: AuthErrors = {};

  if (!email) {
    errors.email = "Email không được để trống";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Email không hợp lệ";
  }

  return errors;
};