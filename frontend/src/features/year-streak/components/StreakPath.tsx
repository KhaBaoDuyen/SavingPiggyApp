import React, { useMemo } from "react";
import Svg, { Path } from "react-native-svg";
import { Dimensions } from "react-native";
import { colors } from "../../../shared/theme/colors";
import { Point } from "../types";
import { buildPath } from "../streakPath.util";

const { width } = Dimensions.get("window");

interface Props {
  points: Point[];
  currentStreak: number;
  rowHeight: number;
}

export default function StreakPath({
  points,
  currentStreak,
  rowHeight,
}: Props) {
  const completed = useMemo(
    () => points.filter((p) => p.day <= currentStreak),
    [points, currentStreak]
  );

  const future = useMemo(
    () => points.filter((p) => p.day >= currentStreak),
    [points, currentStreak]
  );

  const height = points.length * rowHeight + rowHeight;

  return (
    <Svg
      width={width}
      height={height}
      style={{ position: "absolute", top: 0, left: 0 }}
    >
      <Path
        d={buildPath(future)}
        stroke={colors.border}
        strokeWidth={5}
        fill="none"
        strokeDasharray="10,6"
      />
      <Path
        d={buildPath(completed)}
        stroke={colors.primary}
        strokeWidth={6}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}