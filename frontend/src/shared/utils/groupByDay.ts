export function groupByDay(data: any[]) {

  const days: Record<string, number> = {};

  data.forEach(item => {

    const date = new Date(item.createdAt)
      .toLocaleDateString("en-CA", { timeZone: "Asia/Ho_Chi_Minh" });

    if (!days[date]) {
      days[date] = 0;
    }

    days[date] += item.amount;

  });

  return Object.keys(days)
    .sort()
    .map(date => ({
      date,
      amount: days[date]
    }));
}