import { StyleSheet, Platform, StatusBar as RNStatusBar } from "react-native";
import { colors } from "../../shared/theme/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F7FB",
    },
    amountContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    amountText: {
        fontSize: 48,
        fontWeight: "700",
        color: colors.primary,
    },
    noteText: {
        marginTop: 12,
        fontSize: 16,
        color: "#999",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        paddingBottom: 4,
    },
    noteInput: {
        marginTop: 12,
        fontSize: 16,
        color: "#666",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        paddingBottom: 4,
        textAlign: "center",
        minWidth: 150,
    },
    keypad: {
        backgroundColor: "#E9EEF6",
        paddingVertical: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    key: {
        width: "33.33%",
        alignItems: "center",
        paddingVertical: 22,
    },
    keyText: {
        fontSize: 26,
        fontWeight: "600",
        color: colors.primary,
    },
    closeButton: {
        position: "absolute",
        top: 45,
        right: 20,
        zIndex: 10,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "rgba(0,0,0,0.05)",
        justifyContent: "center",
        alignItems: "center",
    },
    saveButton: {
        backgroundColor: colors.primary,
        paddingVertical: 16,
        borderRadius: 14,
        marginHorizontal: 20,
        alignItems: "center",
        marginBottom: 30
    },

    saveButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600"
    },
});