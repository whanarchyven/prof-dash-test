import { startOfMonth, endOfMonth, addDays } from 'date-fns';
export const calculateDaysQnt = (startPeriod: Date, endPeriod: Date) => {
  let start = startOfMonth(startPeriod);
  const end = endOfMonth(endPeriod);
  const result = [];

  while (start.getTime() < end.getTime()) {
    result.push(start);
    start = addDays(start, 1);
  }
  return result;
};
