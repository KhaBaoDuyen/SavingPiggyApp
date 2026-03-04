const prisma = require("../../config/db");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");

dayjs.extend(utc);
dayjs.extend(timezone);

exports.getSavingHistory = async (userId) => {

    const goal = await prisma.goal.findFirst({
        where: {
            userId: userId
        }
    });

    if (!goal) {
        throw new Error("Không tìm thấy mục tiêu");
    }

    const savings = await prisma.saving.findMany({
        where: {
            goalId: goal.id
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    return savings;
};

exports.checkinSaving = async ({ userId, amount, note }) => {

    const goal = await prisma.goal.findFirst({
        where: { userId }
    });

    if (!goal) {
        throw new Error("Không tìm thấy mục tiêu");
    }

    const today = new Date().toISOString().slice(0, 10);
    // YYYY-MM-DD

    const savings = await prisma.saving.findMany({
        where: {
            goalId: goal.id
        }
    });

    let todaySaving = null;

    for (const item of savings) {

        const itemDate = item.createdAt.toISOString().slice(0, 10);

        if (itemDate === today) {
            todaySaving = item;
            break;
        }
    }

    // nếu hôm nay đã có → cộng tiền
    if (todaySaving) {

        const updated = await prisma.saving.update({
            where: { id: todaySaving.id },
            data: {
                amount: todaySaving.amount + Number(amount),
                note: note || todaySaving.note
            }
        });

        return {
            message: "Đã cộng thêm tiền hôm nay",
            data: updated
        };
    }

    // nếu chưa có → tạo mới
    const saving = await prisma.saving.create({
        data: {
            goalId: goal.id,
            amount: Number(amount),
            note
        }
    });

    return {
        message: "Đã thêm tiền hôm nay",
        data: saving
    };
};