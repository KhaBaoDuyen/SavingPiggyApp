import { StyleSheet, Platform } from "react-native";
import { colors } from "../../../shared/theme/colors";

export const styles = StyleSheet.create({
    wrapper: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
    },

    container: {
        flexDirection: "row",
        backgroundColor: colors.surface,
        borderRadius: 30,
        height: 65,
        alignItems: "center",
        justifyContent: "space-around",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },

    iconButton: {
        alignItems: "center",
        justifyContent: "center",
    },

    floatingButton: {
        width: 55,
        height: 55,
        borderRadius: 30,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 8,
    },
    label: {
        fontSize: 11,
        marginTop: 4,
        color: colors.primary,
        fontWeight: "600",
    },
});