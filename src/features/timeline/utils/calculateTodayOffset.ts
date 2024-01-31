import { startOfMonth, addDays } from 'date-fns';

export const calculateTodayOffset = (
  startPeriod: Date,
  endPeriod: Date,
  maxOffset: number
) => {
  let start = startOfMonth(startPeriod);
  const end = endPeriod;
  const result = [];

  while (start.getTime() < end.getTime()) {
    result.push(start);
    start = addDays(start, 1);
  }
  if (result.length * 30 >= maxOffset) {
    return maxOffset;
  } else {
    return result.length;
  }
};
