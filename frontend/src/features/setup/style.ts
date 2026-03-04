import { StyleSheet } from "react-native";
import { colors } from "../../shared/theme/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryDark,
        padding: 20,
        paddingTop: 50,
    },

    logo: {
        width: 120,
        height: 120,
        alignSelf: "center",
        marginBottom: 10,
    },

    card: {
        backgroundColor: colors.surface,
        borderRadius: 28,
        padding: 20,
    },

    stepContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20,
    },

    stepDot: {
        fontSize: 24,
        marginHorizontal: 8,
    },

    title: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "700",
        color: colors.textPrimary,
        marginBottom: 15,
    },

    bigNumber: {
        fontSize: 32,
        fontWeight: "800",
        color: colors.primary,
        textAlign: "center",
        marginBottom: 15,
    },

    keypad: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 20,
    },

    key: {
        width: "30%",
        paddingVertical: 18,
        alignItems: "center",
    },

    keyText: {
        fontSize: 22,
        fontWeight: "700",
        color: colors.primary,
    },

    button: {
        width: "100%",
        backgroundColor: colors.warning,
        paddingVertical: 14,
        borderRadius: 18,
        alignItems: "center",
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    },

    buttonText: {
        color: colors.textLight,
        fontWeight: "700",
        fontSize: 16,
    },

    rowButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    backButton: {
        paddingVertical: 14,
        paddingHorizontal: 20,
    },

    backText: {
        color: colors.textSecondary,
        fontWeight: "600",
    },

    result: {
        fontSize: 34,
        fontWeight: "800",
        color: colors.success,
        textAlign: "center",
        marginVertical: 20,
    },
    footer: {
        marginTop: 10,
    },

    keypadContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.surface,
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        elevation: 10,
    },
    buttonDisabled: {
        backgroundColor: colors.disabled,
        opacity: 0.6,
    },
    gif: {
        width: "120%",
        height:"50%"
    }
});