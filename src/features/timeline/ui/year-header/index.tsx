'use client';
import { cva } from 'class-variance-authority';
import { FC, useEffect, useRef, useState } from 'react';
import { timelineSelectors } from '@/shared/store/timelineSlice';
import { useAppSelector } from '@/shared/store/hooks/useAppSelector';
import { useSlider } from '@/features/timeline/hooks/useSlider';
import { addDays, format, startOfMonth, startOfYear } from 'date-fns';
import { calculateDaysQnt } from '@/features/timeline/utils/calculateDaysQnt';
import { ru } from 'date-fns/locale';

export interface YearHeaderProps {
  startPeriod: Date;
  endPeriod: Date;
}

const cvaTimeLineRoot = cva(['h-3', 'flex justify-end', 'relative']);

const cvaTimeLineContainer = cva([
  'w-fit max-w-full  h-full min-h-3 rounded-xl',
  'overflow-x-scroll',
  'timeline-header-items',
]);
const cvaTimeLine = cva(['flex', 'w-fit h-full', 'relative']);

const cvaYearHeaderYearTitle = cva([
  'w-[120px]',
  'font-secondary capitalize text-md',
  'flex items-center justify-center',
]);

const cvaDaySectionRoot = cva([
  'w-[30px] h-full',
  'flex items-center justify-center',
]);
const cvaDaySection = cva(['w-full h-[1px]', 'bg-cBlack bg-opacity-[0.34]']);

const YearHeader: FC<YearHeaderProps> = ({ startPeriod, endPeriod }) => {
  const timeLineRef = useRef<HTMLDivElement>(null);
  const fullTimeLineRef = useRef<HTMLDivElement>(null);

  const storeScrollState = useAppSelector(timelineSelectors.timeLineScroll);

  const [scrollState, setScrollState] = useState<number>(0);

  const days = calculateDaysQnt(startPeriod, endPeriod);

  const checkIsDaySkipped = (day: Date, counter: number) => {
    if ([0, 1, 2, 3].includes(counter)) {
      return true;
    } else {
      return (
        addDays(startOfYear(day), 0).toLocaleDateString() ==
          day.toLocaleDateString() ||
        addDays(startOfYear(day), 1).toLocaleDateString() ==
          day.toLocaleDateString() ||
        addDays(startOfYear(day), 2).toLocaleDateString() ==
          day.toLocaleDateString() ||
        addDays(startOfYear(day), 3).toLocaleDateString() ==
          day.toLocaleDateString()
      );
    }
  };

  useSlider(timeLineRef, days.length * 30);

  useEffect(() => {
    setScrollState(storeScrollState);
  }, [storeScrollState]);

  useEffect(() => {
    timeLineRef.current?.scrollTo(scrollState, 0);
  }, [scrollState]);

  return (
    <div className={cvaTimeLineRoot()}>
      <div ref={timeLineRef} className={cvaTimeLineContainer()}>
        <div ref={fullTimeLineRef} className={cvaTimeLine()}>
          {days.map((day, counter) => {
            const isSkipping = checkIsDaySkipped(day, counter);
            if (!isSkipping) {
              return (
                <div key={counter} className={cvaDaySectionRoot()}>
                  <div className={cvaDaySection()} />
                </div>
              );
            } else {
              if (day.getDate() == startOfMonth(day).getDate()) {
                return (
                  <div key={counter} className={cvaYearHeaderYearTitle()}>
                    {format(startOfMonth(day), 'yyyy', { locale: ru })}
                  </div>
                );
              } else {
                return <></>;
              }
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default YearHeader;
