const express = require("express");
const router = express.Router();
const goalController = require("./goal.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

router.post("/", authMiddleware, goalController.createGoal);
router.post("/:goalId/saving", authMiddleware, goalController.addSaving);
router.get("/", authMiddleware, goalController.getMyGoals);
router.post("/checkin", authMiddleware, goalController.checkinSaving);

module.exports = router;