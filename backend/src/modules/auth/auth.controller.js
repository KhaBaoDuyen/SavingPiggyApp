const authService = require("./auth.service");

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await authService.sendRegisterOtp({ email });
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const result = await authService.verifyOtp({ email, otp });
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.completeRegister = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const result = await authService.completeRegister({
      email,
      password,
      name,
    });
    res.status(201).json({
      message: "Đăng ký thành công",
      data: result,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser({ email, password });
    res.json({
      message: "Đăng nhập thành công",
      data: result,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};