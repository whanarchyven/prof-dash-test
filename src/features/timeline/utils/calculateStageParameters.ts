import { differenceInDays } from 'date-fns';

export const calculateStageWidth = (start: Date, end: Date) => {
  const dayWidth = 30;
  const difference = differenceInDays(end, start);
  return difference * dayWidth;
};

export const calculateStageMarginLeft = (
  startPeriod: Date,
  startDate: Date
) => {
  const dayWidth = 30;
  const difference = differenceInDays(startDate, startPeriod);
  return 15 + difference * dayWidth;
};

export const calculateStageMarginTop = (level: number) =>
  `${1 + (level ?? 0) * 11 + 'rem'}`;
