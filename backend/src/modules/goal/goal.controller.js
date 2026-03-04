const goalService = require("./goal.service");

// ===== TẠO MỤC TIÊU TIẾT KIỆM =====
exports.createGoal = async (req, res) => {
    try {
        const { targetAmount, dailyAmount } = req.body;
        const userId = req.user.userId;

        const goal = await goalService.createGoal({
            userId: userId,
            targetAmount,
            dailyAmount,
        });

        res.json(goal);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// ===== THÊM TIỀN VÀO MỤC TIÊU =====
exports.addSaving = async (req, res) => {
    try {
        const { goalId } = req.params;
        const { amount } = req.body;

        const result = await goalService.addSaving({
            goalId,
            amount,
        });

        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// ===== LẤY DANH SÁCH MỤC TIÊU CỦA USER =====
exports.getMyGoals = async (req, res) => {
    try {

        const userId = req.user.id;

        const data = await goalService.getMyGoals(userId);

        res.json({
            success: true,
            data
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// CHECK IN SAVING  
exports.checkinSaving = async (req, res) => {
    try {

        const userId = req.user.userId;
        const { amount, note } = req.body;

        const result = await goalService.checkinSaving(
            userId,
            amount,
            note
        );

        res.json(result);

    } catch (error) {
         
        res.status(400).json({
            message: error.message
        });

    }
};
exports.checkToday = async (req, res) => {
    const userId = req.user.userId;

    const result = await goalService.checkTodaySaving(userId);

    res.json({
        checked: result
    });
}