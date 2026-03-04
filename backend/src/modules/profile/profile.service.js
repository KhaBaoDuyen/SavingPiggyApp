const prisma = require("../../config/db");

exports.getProfile = async (userId) => {

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            name: true,
            email: true,
            birthDate: true,
            avatar: true
        }
    });

    const goal = await prisma.goal.findFirst({
        where: { userId }
    });

    const remainingAmount =
        (goal?.targetAmount || 0) - (goal?.currentAmount || 0);

    const remainingDays =
        goal?.dailyAmount
            ? Math.ceil(remainingAmount / goal.dailyAmount)
            : 0;

    return {
        name: user.name,
        email: user.email,
        birthDate: user.birthDate,
        avatar: user.avatar,
        targetAmount: goal?.targetAmount || 0,
        currentAmount: goal?.currentAmount || 0,
        dailyAmount: goal?.dailyAmount || 0,
        remainingDays
    };
};

exports.updateProfile = async (
    userId,
    name,
    birthDate,
    targetAmount,
    avatar
) => {

    const user = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            name,
            birthDate: birthDate ? new Date(birthDate) : null,
            avatar
        }
    });

    const goal = await prisma.goal.findFirst({
        where: {
            userId: userId
        }
    });

    if (goal) {

        await prisma.goal.update({
            where: {
                id: goal.id
            },
            data: {
                targetAmount: Number(targetAmount)
            }
        });

    }

    return {
        name: user.name,
        email: user.email
    };
};