export type Transaction = {
  id: string;
  amount: number;
  date: string;
};

export type MonthlyStat = {
  month: string;
  total: number;
};

export function groupByMonth(data: Transaction[]): MonthlyStat[] {
  if (!data || data.length === 0) return [];

  const result: Record<string, number> = {};

  data.forEach(item => {
    if (!item.date || typeof item.amount !== "number") return;

    const month = item.date.slice(0, 7);

    if (!result[month]) {
      result[month] = 0;
    }

    result[month] += item.amount;
  });

  return Object.entries(result)
    .map(([month, total]) => ({
      month,
      total,
    }))
    .sort((a, b) => a.month.localeCompare(b.month));
}

export function getLast6Months(data: MonthlyStat[]): MonthlyStat[] {
  const now = new Date();
  const result: MonthlyStat[] = [];

  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);

    const monthKey = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}`;

    const found = data.find(item => item.month === monthKey);

    result.push({
      month: monthKey,
      total: found ? found.total : 0,
    });
  }

  return result;
}

export function calculatePercent(
  current: number,
  previous: number
): number {
  if (!previous || previous === 0) return 0;

  return ((current - previous) / previous) * 100;
}