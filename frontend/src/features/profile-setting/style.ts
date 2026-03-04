import { StyleSheet } from "react-native";
import { colors } from "../../shared/theme/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryDark,
        padding: 20,
        paddingTop: 50,
        paddingBottom: 50
    },
    rankBox: {
        marginTop: 16,
        padding: 16,
        borderRadius: 18,
        backgroundColor: colors.background,
        flexDirection: "row",
        alignItems: "center",
    },

    rankIcon: {
        width: 60,
        height: 68,
        marginRight: 12,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
    },
    rankTextBox: {
        flex: 1,
    },

    rankLabel: {
        fontSize: 12,
        color: colors.textSecondary,
        marginBottom: 4,
    },

    rankTitle: {
        fontSize: 16,
        fontWeight: "700",
    },
    profileCard: {
        backgroundColor: colors.surface,
        borderRadius: 28,
        padding: 20,
        elevation: 6,
    },

    profileHeader: {
        flexDirection: "row",
        alignItems: "center",
    },

    profileInfo: {
        flex: 1,
    },

    inputName: {
        fontSize: 18,
        fontWeight: "700",
        color: colors.textPrimary,
        borderBottomWidth: 1,
        borderColor: colors.border,
        paddingBottom: 4,
    },

    inputBio: {
        fontSize: 13,
        marginTop: 6,
        color: colors.textSecondary,
        borderBottomWidth: 1,
        borderColor: colors.border,
        paddingBottom: 2,
    },

    divider: {
        height: 1,
        backgroundColor: colors.border,
        marginVertical: 15,
    },

    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },

    label: {
        fontSize: 12,
        color: colors.textSecondary,
    },

    value: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.textPrimary,
    },

    inputValue: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.primaryDark,
        minWidth: 120,
        textAlign: "right",
    },
    saveButton: {
        marginTop: 20,
        backgroundColor: colors.primary,
        paddingVertical: 14,
        borderRadius: 20,
        alignItems: "center",
    },

    saveButtonText: {
        color: colors.textLight,
        fontSize: 16,
        fontWeight: "700",
    },

    streakCard: {
        marginTop: 25,
        backgroundColor: colors.surface,
        borderRadius: 20,
        padding: 18,
        flexDirection: "row",
        alignItems: "center",
        elevation: 4,
    },

    streakIcon: {
        width: 56,
        height: 66,
        marginRight: 12,
        resizeMode: "contain",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 8,
        elevation: 12,
        borderRadius: 16,
    },

    streakTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: colors.primaryDark,
    },

    streakSub: {
        marginTop: 4,
        fontSize: 13,
        color: colors.textSecondary,
    },
    avatarWrapper: {
        position: "relative",
        marginRight: 15,
    },

    avatarFrame: {
        width: 100,
        height: 100,
        borderRadius: 5,
        borderWidth: 3,
        justifyContent: "center",
        alignItems: "center",
    },

    avatar: {
        width: 90,
        height: 90,
        borderRadius: 5,
    },

    cameraIcon: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "#000",
        width: 30,
        height: 30,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#fff",
    },

    errorText: {
        color: "#FF4D4F",
        fontSize: 12,
        marginTop: 4,
    },
});