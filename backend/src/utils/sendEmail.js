const nodemailer = require("nodemailer");

exports.sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Mã OTP xác thực SaveMate",
    html: `<h2>Mã OTP của bạn là: ${otp}</h2>
           <p>Mã có hiệu lực trong 5 phút</p>`,
  });
};