const express = require("express");
const router = express.Router();

const profileController = require("./profile.controller");
const auth = require("../../middlewares/auth.middleware");

router.get("/", auth, profileController.getProfile);

router.put("/", auth, profileController.updateProfile);

module.exports = router;