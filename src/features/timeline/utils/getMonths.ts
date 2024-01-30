import { addMonths, lastDayOfMonth, subMonths } from 'date-fns';

export const getPrevMonthLastDay = (monthAmount?: number) => {
  const prevMonth = subMonths(new Date(), monthAmount ?? 1);

  return lastDayOfMonth(prevMonth);
};

export const getNextMonthLastDay = (monthAmount?: number) => {
  const nextMonth = addMonths(new Date(), monthAmount ?? 1);
  return lastDayOfMonth(nextMonth);
};

export const getThisMonthLastDay = () => {
  return lastDayOfMonth(new Date());
};

export const getMonthDays = (date: Date) => {
  const dates = [];
  for (let i = 1; i <= date.getDate(); i++) {
    dates.push(new Date(date.getFullYear(), date.getMonth(), i));
  }
  return dates;
};
