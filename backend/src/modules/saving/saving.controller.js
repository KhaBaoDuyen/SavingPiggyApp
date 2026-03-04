const savingService = require("./saving.service");

exports.getHistory = async (req, res) => {
    try {

        const userId = req.user.id;

        const history = await savingService.getSavingHistory(userId);

        res.json({
            success: true,
            data: history
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

exports.checkinSaving = async (req, res) => {

    try {

        const userId = req.user.id;

        const { amount, note } = req.body;

        const result = await savingService.checkinSaving({
            userId,
            amount,
            note
        });

        res.json({
            success: true,
            ...result
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};