'use client';
import { cva } from 'class-variance-authority';
import { FC, useEffect, useRef, useState } from 'react';
import { timelineSelectors } from '@/shared/store/timelineSlice';
import { useAppSelector } from '@/shared/store/hooks/useAppSelector';
import {
  getNextMonthLastDay,
  getPrevMonthLastDay,
  getThisMonthLastDay,
  getMonthDays,
} from '@/features/timeline/utils/getMonths';
import { useSlider } from '@/features/timeline/hooks/useSlider';
import DaySection from '@/shared/ui/day-section/ui';

export interface TimeLineHeaderProps {}

const cvaTimeLineRoot = cva([
  'w-fit max-w-full absolute z-[-1] h-full pt-[20rem] min-h-3 rounded-xl',
  'overflow-x-scroll',
  'timeline-items',
]);
const cvaTimeLine = cva(['flex w-fit relative h-full']);

const TimeLineHeader: FC<TimeLineHeaderProps> = () => {
  const prevMonthDays = getMonthDays(getPrevMonthLastDay());
  const thisMonthDays = getMonthDays(getThisMonthLastDay());
  const nextMonthDays = getMonthDays(getNextMonthLastDay());

  const timeLineRef = useRef<HTMLDivElement>(null);

  const storeScrollState = useAppSelector(timelineSelectors.timeLineScroll);

  const [scrollState, setScrollState] = useState(0);

  useSlider(timeLineRef);

  useEffect(() => {
    // console.log(storeScrollState.timeLineScroll)
    setScrollState(storeScrollState);
  }, [storeScrollState]);

  useEffect(() => {
    timeLineRef.current?.scrollTo(scrollState, 0);
    // console.log(scrollState,'ScrollTo')
  }, [scrollState]);

  return (
    <div ref={timeLineRef} className={cvaTimeLineRoot()}>
      <div className={cvaTimeLine()}>
        {prevMonthDays.map((day, counter) => (
          <DaySection key={counter} isUnfilled date={day} />
        ))}
        {thisMonthDays.map((day, counter) => (
          <DaySection key={counter} isUnfilled date={day} />
        ))}
        {nextMonthDays.map((day, counter) => (
          <DaySection key={counter} isUnfilled date={day} />
        ))}
      </div>
    </div>
  );
};

export default TimeLineHeader;
