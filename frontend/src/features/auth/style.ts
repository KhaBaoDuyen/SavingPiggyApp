import { StyleSheet, Platform } from "react-native";
import { colors } from "../../shared/theme/colors";

export const styles = StyleSheet.create({
     scrollContainer: {
        flexGrow: 1,
        backgroundColor: colors.surface,
    },

    container: {
        flex: 1,
        paddingHorizontal: 30,
        paddingTop: Platform.OS === "ios" ? 20 : 50, 
        paddingBottom: 30,
        justifyContent: "space-between", 
        backgroundColor: colors.surface,
    },

    header: {
        alignItems: "center",
        width: "100%",
    },

    logo: {
        width: 140,
        height: 60,
        resizeMode: "contain",
    },

    formContent: {
        flex: 1,
        justifyContent: "center",  
        marginTop: 20,
    },

    title: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 30,
        color: "#333",  
        textAlign: "left",
    },

    input: {
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        height: 55,  
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#F0F0F0",  
        marginBottom: 15,
        fontSize: 16,
         shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },

    error: {
        color: colors.danger,
        fontSize: 12,
        marginTop: -10,
        marginBottom: 10,
        marginLeft: 5,
    },

    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 25,
        marginTop: 5,
    },

    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: colors.border,
        marginRight: 10,
        borderRadius: 6,
    },

    checkboxText: {
        color: colors.textSecondary,
        fontSize: 14,
    },

    button: {
        height: 55,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: colors.primaryDark,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },

    buttonText: {
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 16,
    },

    divider: {
        textAlign: "center",
        marginVertical: 40,
        color: colors.textSecondary,
        fontSize: 14,
    },

    socialContainer: {
        marginTop: 40,
    },

    socialBox: {
        width: 85,
        height: 55,
        borderRadius: 12,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#F0F0F0",
        alignItems: "center",
        justifyContent: "center",
        // Shadow nhẹ cho các ô Social
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },

    socialIcon: {
        width: 24,
        height: 24,
        resizeMode: "contain",
    },

    footer: {
        paddingBottom: 10,
    },

    signupText: {
        textAlign: "center",
        color: colors.textSecondary,
        fontSize: 14,
    },

    signupLink: {
        color: colors.primaryDark,
        fontWeight: "700",
    },
    googleButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#E0E0E0",
        paddingVertical: 14,
        borderRadius: 12,
    },

    googleText: {
        marginLeft: 10,
        fontSize: 15,
        fontWeight: "500",
        color: "#333",
    },
});