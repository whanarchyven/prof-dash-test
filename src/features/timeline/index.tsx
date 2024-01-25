'use client';
import { cva } from 'class-variance-authority';
import { FC, useEffect, useState } from 'react';
import DaySection from '@/shared/ui/day-section/ui';
import {
  subMonths,
  addMonths,
  lastDayOfMonth,
  differenceInDays,
  areIntervalsOverlapping,
} from 'date-fns';
import StageItem, { StageItemProps } from '@/entities/stage-item/ui';

export interface TimeLineProps {
  stages: {
    level?: number;
    dateStart: Date;
    dateEnd: Date;
    stageInfo: StageItemProps;
  }[];
}

const getPrevMonthDays = () => {
  const prevMonth = subMonths(new Date(), 1);

  return lastDayOfMonth(prevMonth);
};

const getNextMonthDays = () => {
  const nextMonth = addMonths(new Date(), 1);
  return lastDayOfMonth(nextMonth);
};

const getThisMonthDays = () => {
  return lastDayOfMonth(new Date());
};

const cvaTimeLineRoot = cva([
  'w-fit max-w-full bg-white h-full rounded-xl',
  'overflow-x-scroll',
]);
const cvaTimeLine = cva(['flex w-fit relative h-fit']);

const cvaStage = cva(['absolute z-[9999]']);

const calculateStageWith = (start: Date, end: Date) => {
  const dayWidth = 30;
  const difference = differenceInDays(end, start);
  return difference * dayWidth;
};

const calculateStageMargin = (startPeriod: Date, startDate: Date) => {
  const dayWidth = 30;
  const difference = differenceInDays(startDate, startPeriod);
  return 15 + difference * dayWidth;
};

const getMonthDays = (date: Date) => {
  const dates = [];
  for (let i = 1; i <= date.getDate(); i++) {
    dates.push(new Date(date.getFullYear(), date.getMonth(), i));
  }
  return dates;
};
const TimeLine: FC<TimeLineProps> = ({ stages }) => {
  const prevMonthDays = getMonthDays(getPrevMonthDays());
  const thisMonthDays = getMonthDays(getThisMonthDays());
  const nextMonthDays = getMonthDays(getNextMonthDays());

  const [fitleredStages, setFilteredStages] = useState([...stages]);

  useEffect(() => {
    const temp = [...fitleredStages];
    let level = 0;
    temp.map((stage, counter) => {
      if (counter != 0) {
        if (
          areIntervalsOverlapping(
            {
              start: temp[counter - 1].dateStart,
              end: temp[counter - 1].dateEnd,
            },
            { start: temp[counter].dateStart, end: temp[counter].dateEnd }
          )
        ) {
          level++;
          stage.level = level;
        } else {
          level = 0;
          stage.level = level;
        }
      }
    });
    setFilteredStages([...temp]);
  }, []);

  console.log(
    calculateStageWith(new Date('2024-01-25'), new Date('2024-01-28'))
  );

  return (
    <div className={cvaTimeLineRoot()}>
      {/*<div className={cvaTimeLine()}>*/}
      {/*    */}
      {/*</div>*/}
      <div className={cvaTimeLine()}>
        {prevMonthDays.map((day, counter) => {
          return <DaySection key={counter} date={day} />;
        })}
        {thisMonthDays.map((day, counter) => {
          return <DaySection key={counter} date={day} />;
        })}
        {nextMonthDays.map((day, counter) => {
          return <DaySection key={counter} date={day} />;
        })}
        {stages.map((item, counter) => {
          const width = calculateStageWith(item.dateStart, item.dateEnd);
          const marginLeft = calculateStageMargin(
            prevMonthDays[0],
            item.dateStart
          );
          const marginTop = 10 + (item.level ?? 0) * 170;
          return (
            <div
              key={counter}
              style={{ width: width, left: marginLeft, top: marginTop }}
              className={cvaStage()}>
              <StageItem {...item.stageInfo} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimeLine;
