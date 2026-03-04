const profileService = require("./profile.service");

exports.getProfile = async (req, res) => {
  try {

    const userId = req.user.userId;

    const profile = await profileService.getProfile(userId);

    console.log("PROFILE:", profile);

    res.json(profile);

  } catch (error) {

    console.log("PROFILE ERROR:", error);

    res.status(400).json({
      message: error.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {

    const userId = req.user.userId;

    const { name, birthDate, targetAmount, avatar } = req.body;

    const user = await profileService.updateProfile(
      userId,
      name,
      birthDate,
      targetAmount,
      avatar
    );

    res.json({
      message: "Cập nhật thành công",
      user,
    });

  } catch (error) {

    res.status(400).json({
      message: error.message,
    });

  }
};