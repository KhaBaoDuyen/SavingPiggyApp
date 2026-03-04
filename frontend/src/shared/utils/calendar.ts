export const generateRealDays = () => {
  const today = new Date();
  const days = [];
  const dayNames = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  for (let i = -2; i <= 2; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);

    days.push({
      dayName: dayNames[date.getDay()],
      dateNum: date.getDate(),
      isToday: i === 0,
      status: i <= 0 ? "done" : "pending"
    });
  }

  return days;
};