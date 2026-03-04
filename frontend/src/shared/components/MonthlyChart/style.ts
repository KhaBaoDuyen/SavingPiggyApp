 
import { StyleSheet } from "react-native";
import { colors } from "../../../shared/theme/colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginTop: 10,
    marginBottom: 10
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
  },

  percentText: {
    fontSize: 14,
    fontWeight: "600",
  },

  chartContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 150,
  },

  barWrapper: {
    alignItems: "center",
    flex: 1,
  },

  bar: {
    width: 18,
    borderRadius: 6,
  },

  monthLabel: {
    marginTop: 6,
    fontSize: 12,
    color: colors.textSecondary,
  },

  amountText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
});