import { startOfMonth, addDays } from 'date-fns';
export const calculateDaysQntBetweenDates = (
  startPeriod: Date,
  endPeriod: Date
) => {
  let start = startOfMonth(startPeriod);
  const end = endPeriod;
  const result = [];

  while (start.getTime() < end.getTime()) {
    result.push(start);
    start = addDays(start, 1);
  }
  return result;
};
