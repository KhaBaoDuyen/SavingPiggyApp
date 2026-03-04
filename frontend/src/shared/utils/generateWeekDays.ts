export const generateWeekDays = (transactions: any[]) => {

  if (!transactions.length) return [];

  const getDateKey = (date: Date) =>
    date.toLocaleDateString("en-CA");

  const getISO = (iso: string) =>
    iso.slice(0, 10);

  const sorted = [...transactions].sort(
    (a, b) =>
      new Date(a.createdAt).getTime() -
      new Date(b.createdAt).getTime()
  );

  const firstDate = new Date(getISO(sorted[0].createdAt) + "T00:00:00");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayKey = getDateKey(today);

  const diff =
    (today.getTime() - firstDate.getTime()) /
    (1000 * 60 * 60 * 24);

  const currentDay = Math.floor(diff) + 1;

  /* ===== TÍNH THỨ TRONG TUẦN ===== */

  const weekday = today.getDay();

  const mondayOffset = weekday === 0 ? -6 : 1 - weekday;

  const mondayDate = new Date(today);
  mondayDate.setDate(today.getDate() + mondayOffset);

  const weekNames = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

  const savedSet = new Set(
    transactions.map((t: any) => getISO(t.createdAt))
  );
  // console.log("savedSet:", [...savedSet]);
  const days: any[] = [];

  for (let i = 0; i < 7; i++) {

    const date = new Date(mondayDate);
    date.setDate(mondayDate.getDate() + i);

    const key = date.toLocaleDateString("en-CA")

    const diffFromStart =
      (date.getTime() - firstDate.getTime()) /
      (1000 * 60 * 60 * 24);

    const dayIndex = Math.floor(diffFromStart) + 1;

    const hasSaving = savedSet.has(key);

    let status = "future";

    if (dayIndex < currentDay)
      status = hasSaving ? "done" : "miss";

    if (dayIndex === currentDay)
      status = hasSaving ? "done" : "miss";

    if (dayIndex > currentDay)
      status = "future";

    days.push({
      dayName: weekNames[i],
      dateNum: dayIndex > 0 ? dayIndex : "",
      status,
      isToday: key === todayKey
    });

  }

  return days;

};