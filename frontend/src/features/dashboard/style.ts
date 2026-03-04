import { StyleSheet, Platform, StatusBar as RNStatusBar } from "react-native";
import { colors } from "../../shared/theme/colors";

export const styles = StyleSheet.create({
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

    progressContainer: {
        marginTop: 5,
        marginBottom: 15
    },

    progressBg: {
        height: 14,
        borderRadius: 20,
        backgroundColor: colors.futureNodeBorder,
        overflow: "hidden"
    },

    progressFill: {
        height: 14,
        borderRadius: 20,
        backgroundColor: colors.warning
    },

    reminderBtn: {
        backgroundColor: colors.warning,
        borderRadius: 16,
        paddingVertical: 14,
        alignItems: "center"
    },

    reminderBtnText: {
        color: colors.textLight,
        fontWeight: "700"
    },
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0,
        paddingBottom: 50
    },

    scrollContainer: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },

    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 25,
    },

    welcomeText: {
        fontSize: 18,
        color: colors.textSecondary
    },

    titleBold: {
        fontSize: 26,
        fontWeight: "bold",
        color: colors.textPrimary
    },

    iconPlaceholder: {
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },

    // Banner Card
    summaryCard: {
        borderRadius: 26,
        padding: 22,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 30,
        elevation: 6,
        shadowColor: colors.primaryDark,
        shadowOpacity: 0.25,
        shadowRadius: 12,
    },

    summaryContent: {
        flex: 1,
    },

    summaryTitle: {
        color: colors.futureNodeBg,
        fontSize: 16,
        lineHeight: 24,
        fontWeight: "600"
    },

    viewTaskButton: {
        paddingVertical: 9,
        paddingHorizontal: 16,
        borderRadius: 14,
        marginTop: 15,
        alignSelf: 'flex-start'
    },

    viewTaskText: {
        color: colors.textLight,
        fontWeight: "bold",
        fontSize: 12,
    },

    circleOutline: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 6,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(255,255,255,0.15)',
    },

    circleFill: {
        position: 'absolute',
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 6,
        borderColor: 'transparent',
        transform: [{ rotate: '-45deg' }]
    },

    progressText: {
        color: colors.textLight,
        fontSize: 18,
        fontWeight: "bold"
    },

    targetLabel: {
        color: colors.textLight,
        fontSize: 10,
        marginTop: 6,
        opacity: 0.8,
        textAlign: "center",
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
        marginTop: 5
    },

    // Grid
    gridContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        marginTop: 5
    },

    leftColumn: {
        width: "48%"
    },

    rightColumn: {
        width: "48%"
    },

    taskBox: {
        borderRadius: 22,
        padding: 18,
        marginBottom: 15,
        minHeight: 120,
        justifyContent: 'center',

        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
        elevation: 3,
    },

    boxTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: colors.textPrimary
    },

    boxTime: {
        fontSize: 14,
        fontWeight: "700",
        marginTop: 6
    },

    emojiIcon: {
        fontSize: 24,
        alignSelf: 'flex-end',
        marginTop: 10,
        opacity: 0.8
    },

    // Card Lịch
    calendarCard: {
        borderRadius: 28,
        padding: 20,
        marginBottom: 25,
        elevation: 8,
        shadowColor: colors.primaryDark,
        shadowOpacity: 0.25,
        shadowRadius: 10,
    },

    calendarHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },

    calendarMonth: {
        color: colors.textLight,
        fontSize: 18,
        fontWeight: 'bold',
    },

    streakBadge: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 20,
    },

    streakText: {
        color: colors.textLight,
        fontSize: 12,
        fontWeight: '600',
    },



    dayColumn: {
        alignItems: 'center',
    },



    dateCircle: {
        width: 42,
        height: 42,
        borderRadius: 21,
        justifyContent: 'center',
        alignItems: 'center',
    },

    dateText: {
        color: colors.textLight,
        fontSize: 15,
        fontWeight: 'bold',
    },


    targetAmount: {
        color: colors.textLight,
        marginTop: 8,
        fontSize: 16,
        fontWeight: "600"
    },
    taskBoxNew: {
        width: "48%",
        borderRadius: 22,
        padding: 18,
        marginBottom: 15,
        minHeight: 120,
        justifyContent: "space-between",

        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
        elevation: 3,
    },

    boxAmount: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.primary,
        marginTop: 4
    },

    boxDate: {
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: 6
    },

    boxIcon: {
        position: "absolute",
        right: 14,
        bottom: 12,
        opacity: 0.8
    },

    addBox: {
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center"
    },

    addTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.textLight,
        textAlign: "center"
    },

    addSub: {
        color: colors.textLight,
        fontSize: 12,
        marginTop: 6,
        opacity: 0.8
    },
    boxImage: {
        width: 40,
        height: 40,
    },

});