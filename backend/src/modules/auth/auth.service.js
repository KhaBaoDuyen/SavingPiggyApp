const prisma = require("../../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendOtpEmail } = require("../../utils/sendEmail");

exports.sendRegisterOtp = async ({ email }) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Email đã tồn tại");
  }

  const existingOtp = await prisma.otp.findFirst({
    where: {
      email,
      expiresAt: { gt: new Date() },
    },
  });

  if (existingOtp) {
    throw new Error("OTP đã được gửi, vui lòng kiểm tra email");
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await prisma.otp.create({
    data: {
      email,
      code: otp,
      isVerified: false,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    },
  });

  await sendOtpEmail(email, otp);

  return { message: "OTP đã được gửi qua email" };
};

exports.verifyOtp = async ({ email, otp }) => {
  const otpRecord = await prisma.otp.findFirst({
    where: {
      email,
      code: otp,
      expiresAt: { gt: new Date() },
    },
  });

  if (!otpRecord) {
    throw new Error("OTP không hợp lệ hoặc đã hết hạn");
  }

  await prisma.otp.update({
    where: { id: otpRecord.id },
    data: { isVerified: true },
  });

  return { message: "Xác thực OTP thành công" };
};

exports.completeRegister = async ({ email, password, name }) => {
  const otpRecord = await prisma.otp.findFirst({
    where: {
      email,
      isVerified: true,
      expiresAt: { gt: new Date() },
    },
  });

  if (!otpRecord) {
    throw new Error("Email chưa được xác thực OTP");
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Email đã tồn tại");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  await prisma.otp.deleteMany({
    where: { email },
  });

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    },
    token,
  };
};

exports.loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Email không tồn tại");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Sai mật khẩu");
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    },
    token,
  };
};