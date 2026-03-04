import { StyleSheet } from "react-native";
import { colors } from "../../../../shared/theme/colors";

export const styles = StyleSheet.create({
  stepContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },

  stepDot: {
    fontSize: 24,
    marginHorizontal: 8,
    color: colors.futureNodeBorder,
  },
});