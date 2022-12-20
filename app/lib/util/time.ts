import dayjs from "dayjs";

export const getCurrentWeekBoundaries = () => {
  const now = dayjs();
  const start = now.startOf("week").add(1, "day");
  const end = now.endOf("week").add(1, "day");

  return { start, end };
};

export const getCurrentMonthBoundaries = () => {
  const now = dayjs();
  const start = now.startOf("month");
  const end = now.endOf("month");

  return { start, end };
};
