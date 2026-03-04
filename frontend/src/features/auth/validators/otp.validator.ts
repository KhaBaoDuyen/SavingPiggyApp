import { AuthBase, AuthErrors } from "../types/auth.types";

export const validateOtp = (
    otp: string,
): AuthErrors => {
    const errors: AuthErrors = {};

    if (!otp) {
        errors.otp = "OTP không được để trống";
    } else if (otp.length < 6) {
        errors.otp = "OTP phải đủ 6 số";
    }

    return errors;
};