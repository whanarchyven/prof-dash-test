'use client';
import { cva } from 'class-variance-authority';
import { FC } from 'react';
import DaySection from '@/shared/ui/day-section/ui';
import { ScrollContainer } from 'react-indiana-drag-scroll';
import 'react-indiana-drag-scroll/dist/style.css';

interface TimeLineProps {}

const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const monthDaysV = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const getPrevMonthDays = () => {
  let today = new Date();
  const year =
    today.getMonth() == 0 ? today.getFullYear() - 1 : today.getFullYear();
  const prev_month = today.getMonth() == 0 ? 11 : today.getMonth() - 1;

  if (!(year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
    //невисокосный год
    today = new Date(year, prev_month, monthDays[prev_month]);
  } else {
    //високосный год
    today = new Date(year, prev_month, monthDaysV[prev_month]);
  }
  return today;
};

const getNextMonthDays = () => {
  //кол-во дней в месяцах високосного года
  let today = new Date();
  const year =
    today.getMonth() == 11 ? today.getFullYear() + 1 : today.getFullYear();
  const next_month = today.getMonth() == 11 ? 0 : today.getMonth() + 1;

  if (!(year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
    //невисокосный год
    today = new Date(year, next_month, monthDays[next_month]);
  } else {
    //високосный год
    today = new Date(year, next_month, monthDaysV[next_month]);
  }
  return today;
};

const getThisMonthDays = () => {
  let today = new Date();
  const year = today.getFullYear();

  if (!(year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
    //невисокосный год
    today = new Date(year, today.getMonth(), monthDays[today.getMonth()]);
  } else {
    //високосный год
    today = new Date(year, today.getMonth(), monthDaysV[today.getMonth()]);
  }
  return today;
};

const cvaTimeLineRoot = cva([
  'w-fit max-w-full bg-white h-full rounded-xl',
  'overflow-x-scroll',
]);
const cvaTimeLine = cva(['flex w-fit h-full']);

const getMonthDays = (date: Date) => {
  const dates = [];
  for (let i = 1; i <= date.getDate(); i++) {
    dates.push(new Date(date.getFullYear(), date.getMonth(), i));
  }
  return dates;
};
const TimeLine: FC<TimeLineProps> = () => {
  const prevMonthDays = getMonthDays(getPrevMonthDays());
  const thisMonthDays = getMonthDays(getThisMonthDays());
  const nextMonthDays = getMonthDays(getNextMonthDays());
  return (
    <div className={cvaTimeLineRoot()}>
      <ScrollContainer className={cvaTimeLine()} mouseScroll={true}>
        {prevMonthDays.map((day, counter) => {
          return <DaySection key={counter} date={day} />;
        })}
        {thisMonthDays.map((day, counter) => {
          return <DaySection key={counter} date={day} />;
        })}
        {nextMonthDays.map((day, counter) => {
          return <DaySection key={counter} date={day} />;
        })}
      </ScrollContainer>
      {/*<div className={cvaTimeLine()}>*/}
      {/*    */}
      {/*</div>*/}
    </div>
  );
};

export default TimeLine;
