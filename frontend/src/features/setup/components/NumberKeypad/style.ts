import { StyleSheet } from "react-native";
import { colors } from "../../../../shared/theme/colors";

export const styles = StyleSheet.create({
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
});