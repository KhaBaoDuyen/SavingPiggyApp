import { StyleSheet } from "react-native";
import { colors } from "../../shared/theme/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 100
    },
    headerSection: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.primaryDark,
    },

    totalLabel: {
        fontSize: 14,
        color: colors.textLight,
    },

    totalAmount: {
        fontSize: 40,
        fontWeight: "800",
        marginTop: 6,
        color: colors.textLight,
    },

    percentText: {
        fontSize: 13,
        marginTop: 4,
        color: colors.accent,
        fontWeight: "600",
    },

    historySection: {
        backgroundColor: colors.surface,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -20,
        paddingTop: 15,
        paddingHorizontal: 20,
    },

    title: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 20,
        textAlign: "center",
        color: colors.textPrimary,
    },

    listContainer: {
        paddingBottom: 40,
    },

    timelineRow: {
        flexDirection: "row",
        marginBottom: 28,
    },

    timelineLeft: {
        width: 40,
        alignItems: "center",
    },

    lineTop: {
        width: 2,
        flex: 1,
        backgroundColor: colors.border,
    },

    lineBottom: {
        width: 2,
        flex: 1,
        backgroundColor: colors.border,
    },

    dotRing: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.surface,
        marginVertical: 6,
    },

    dotInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },

    card: {
        flex: 1,
        padding: 18,
        borderRadius: 22,
        marginLeft: 12,
        borderWidth: 1,
        borderColor: colors.border,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
        elevation: 4,
    },
    cardOuter: {
        flex: 1,
        marginLeft: 12,
        borderRadius: 22,
        padding: 6,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 8 },
        elevation: 6,
    },

    cardInner: {
        backgroundColor: colors.surface,
        borderRadius: 18,
        padding: 18,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    amount: {
        fontSize: 16,
        fontWeight: "700",
        color: colors.textPrimary,
    },

    note: {
        fontSize: 14,
        marginTop: 6,
        color: colors.textSecondary,
    },

    date: {
        fontSize: 12,
        marginTop: 6,
        color: colors.textSecondary,
    },
    progressWrapper: {
        width: "80%",
        marginTop: 12,
        alignItems: "center",
    },

    progressBackground: {
        width: "90%",
        height: 8,
        backgroundColor: colors.border,
        borderRadius: 10,
        overflow: "hidden",
    },

    progressFill: {
        height: "100%",
        backgroundColor: colors.warning,
        borderRadius: 10,
    },

    percentLabel: {
        marginTop: 6,
        fontSize: 13,
        fontWeight: "600",
        color: colors.textLight,
    },
});