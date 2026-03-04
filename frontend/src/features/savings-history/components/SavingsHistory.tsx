import { colors } from "../../../shared/theme/colors";
export const getCardColor = (amount: number) => {
  if (amount >= 50000) return colors.success;
  if (amount >= 40000) return colors.accent;
  if (amount >= 30000) return colors.warning;
  if (amount >= 20000) return colors.primary;
  return colors.futureNodeBg;
};