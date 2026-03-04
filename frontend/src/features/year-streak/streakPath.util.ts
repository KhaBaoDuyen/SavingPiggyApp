import { Point } from "./types";

export const buildPath = (points: Point[]) => {
  if (!points.length) return "";

  let d = `M ${points[0].x} ${points[0].y}`;

  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const cur = points[i];
    const cpY = (prev.y + cur.y) / 2;
    d += ` C ${prev.x} ${cpY}, ${cur.x} ${cpY}, ${cur.x} ${cur.y}`;
  }

  return d;
};