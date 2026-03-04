const express = require("express");
const router = express.Router();

const savingController = require("./saving.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

router.get(
    "/history",
    authMiddleware,
    savingController.getHistory
);

router.post(
    "/checkin",
    authMiddleware,
    savingController.checkinSaving
);

module.exports = router;