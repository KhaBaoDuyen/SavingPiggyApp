const prisma = require("../../config/db");

exports.createGoal = async ({
    userId,
    targetAmount,
    dailyAmount,
}) => {
    if (!targetAmount || !dailyAmount) {
        throw new Error("Thiếu dữ liệu");
    }

    const goal = await prisma.goal.create({
        data: {
            targetAmount: Number(targetAmount),
            dailyAmount: Number(dailyAmount),
            userId,
        },
    });

    const estimatedDays = Math.ceil(
        goal.targetAmount / goal.dailyAmount
    );

    return {
        ...goal,
        estimatedDays,
    };
};

exports.getUserGoals = async (userId) => {
    // console.log("USER ID:",  userId);
    return await prisma.goal.findMany({
        where: { userId },
    });
};

//SAVING 
exports.checkinSaving = async (userId, amount, note) => {

    const goal = await prisma.goal.findFirst({
        where: { userId }
    });

    if (!goal) {
        throw new Error("Chưa có mục tiêu tiết kiệm");
    }

    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const todaySaving = await prisma.saving.findFirst({
        where: {
            goalId: goal.id,
            createdAt: {
                gte: start,
                lte: end
            }
        }
    });

    const value = Number(amount || goal.dailyAmount);

     if (todaySaving) {

        const updated = await prisma.saving.update({
            where: { id: todaySaving.id },
            data: {
                amount: {
                    increment: value
                },
                note: note ?? todaySaving.note
            }
        });

        await prisma.goal.update({
            where: { id: goal.id },
            data: {
                currentAmount: {
                    increment: value
                }
            }
        });

        return {
            message: "Đã cộng thêm tiền hôm nay",
            saving: updated
        }
    }

    // nếu chưa có -> create
    const saving = await prisma.saving.create({
        data: {
            goalId: goal.id,
            amount: value,
            note: note ?? "Bỏ tiền vào heo 🐷"
        }
    });

    const updatedGoal = await prisma.goal.update({
        where: { id: goal.id },
        data: {
            currentAmount: {
                increment: value
            },
            streak: {
                increment: 1
            },
            lastSaveDate: new Date()
        }
    });

    return {
        message: "Đã bỏ tiền vào heo 🐷",
        saving,
        streak: updatedGoal.streak
    };
};

exports.checkTodaySaving = async (userId) => {

    const goal = await prisma.goal.findFirst({
        where: { userId }
    });

    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const saving = await prisma.saving.findFirst({
        where: {
            goalId: goal.id,
            createdAt: {
                gte: start,
                lte: end
            }
        }
    });

    return !!saving;
};

exports.getMyGoals = async (userId) => {
    // console.log("USER ID =>:", userId);
    const goal = await prisma.goal.findFirst({
        where: {
            userId: userId
        },
        include: {
            savings: {
                orderBy: {
                    createdAt: "desc"
                }
            }
        }
    });

    if (!goal) {
        return null;
    }

    const percent = Math.floor(
        (goal.currentAmount / goal.targetAmount) * 100
    );

    return {
        goal,
        percent
    };
};

exports.addSaving = async ({ goalId, amount }) => {

    const goal = await prisma.goal.findUnique({
        where: { id: goalId }
    });

    if (!goal) {
        throw new Error("Goal không tồn tại");
    }

    const today = new Date();
    const lastSaveDate = goal.lastSaveDate;

    let newStreak = goal.streak || 0;

    if (lastSaveDate) {

        const diffTime = today - new Date(lastSaveDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            // cùng ngày -> giữ streak
        }
        else if (diffDays === 1) {
            newStreak += 1;
        }
        else if (diffDays >= 3) {
            newStreak = 1;
        }

    } else {
        newStreak = 1;
    }

    const saving = await prisma.saving.create({
        data: {
            goalId,
            amount: Number(amount)
        }
    });

    await prisma.goal.update({
        where: { id: goalId },
        data: {
            currentAmount: {
                increment: Number(amount)
            },
            streak: newStreak,
            lastSaveDate: today
        }
    });

    return saving;
};