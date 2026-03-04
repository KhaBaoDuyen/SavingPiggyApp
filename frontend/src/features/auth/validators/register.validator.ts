import { AuthErrors } from "../types/auth.types";

export const validateRegister = (
  email: string,
  password: string,
  confirmPassword: string,
  name: string
): AuthErrors => {
  const errors: AuthErrors = {};

  if (!email) {
    errors.email = "Email không được để trống";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Email không hợp lệ";
  }

  if (!password) {
    errors.password = "Mật khẩu không được để trống";
  } else if (password.length < 6) {
    errors.password = "Mật khẩu tối thiểu 6 ký tự";
  }

  if (!name) {
    errors.name = "Tên đăng nhập không được để trống";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Vui lòng xác nhận mật khẩu";
  } else if (confirmPassword !== password) {
    errors.confirmPassword = "Mật khẩu không khớp";
  }

  return errors;
};