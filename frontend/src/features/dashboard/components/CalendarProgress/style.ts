import { StyleSheet } from "react-native";
import { colors } from "../../../../shared/theme/colors";

export const styles = StyleSheet.create({
    dayCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 6
    },

    /* DONE - đã điểm danh */
    dayDone: {
        backgroundColor: colors.warning
    },

    /* MISS - quá khứ chưa điểm danh */
    dayMiss: {
        borderWidth: 2,
        borderColor: colors.textLight,
        backgroundColor: "transparent"
    },

    /* FUTURE - ngày tương lai */
    dayFuture: {
        backgroundColor: colors.futureNodeBorder,
        borderWidth: 0,
        color: colors.textPrimary
    },

    /* TODAY */
    todayCircle: {
        borderWidth: 2,
        borderColor: colors.textLight,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 4
    },

    dayNumber: {
        color: colors.textLight,
        fontWeight: "700",
        fontSize: 15
    },

    /* ================= CARD ================= */

    streakCard: {
        backgroundColor: colors.primaryDark,
        borderRadius: 20,
        padding: 18,
        marginBottom: 20
    },

    streakHeader: {
        marginBottom: 15
    },

    streakTag: {
        backgroundColor: colors.primary,
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 8,
        alignSelf: "flex-start",
        marginBottom: 8
    },

    streakTagText: {
        color: colors.textLight,
        fontSize: 12,
        fontWeight: "700"
    },

    streakNumber: {
        fontSize: 26,
        fontWeight: "700",
        color: colors.warning,
        marginBottom: 6
    },

    streakSub: {
        fontSize: 14,
        color: colors.futureNodeBg
    },

    /* ================= WEEK ROW ================= */

    weekRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        marginBottom: 10
    },

    dayText: {
        color: colors.futureNodeBorder,
        fontWeight: "600"
    },

    todayText: {
        color: colors.warning
    },

    /* ================= BUTTON ================= */

    reminderBtn: {
        backgroundColor: colors.warning,
        borderRadius: 16,
        paddingVertical: 14,
        alignItems: "center"
    },

    reminderBtnText: {
        color: colors.textLight,
        fontWeight: "700"
    }

});