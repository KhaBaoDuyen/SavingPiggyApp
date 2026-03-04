import { useMemo, useState } from "react";
import { Dimensions } from "react-native";
import { DayData } from "../types";

const { width } = Dimensions.get("window");

export const ROW_HEIGHT = 150;
export const TOTAL_DAYS = 100000; 
export const AMPLITUDE = width * 0.32;

export const useYearStreak = (currentStreak: number) => {
  const [savings, setSavings] = useState<DayData>({});

  const totalSaved = useMemo(
    () => Object.values(savings).reduce((a, b) => a + b, 0),
    [savings]
  );

  return {
    savings,
    setSavings,
    totalSaved,
    currentStreak,
  };
};