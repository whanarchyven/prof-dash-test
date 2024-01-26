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
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import TimelineHeaderDaySection from '@/features/timeline/ui/timeline-header-day-section';

export interface TimeLineHeaderProps {}

const cvaTimeLineRoot = cva([
  'w-fit max-w-full bg-white h-full min-h-3 rounded-xl',
  'overflow-x-scroll',
  'timeline-items',
]);
const cvaTimeLine = cva(['flex w-fit relative h-full']);

const cvaTimeLineHeaderMonthTitle = cva([
  'w-[120px] font-secondary capitalize flex items-center justify-center text-sm',
]);
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
        <div className={cvaTimeLineHeaderMonthTitle()}>
          {format(prevMonthDays[0], 'LLLL yy', { locale: ru })}
        </div>
        {prevMonthDays.map(
          (day, counter) =>
            counter >= 4 && (
              <TimelineHeaderDaySection
                key={counter}
                day={day}
                daysQnt={prevMonthDays.length}
              />
            )
        )}
        <div className={cvaTimeLineHeaderMonthTitle()}>
          {format(thisMonthDays[0], 'LLLL yy', { locale: ru })}
        </div>
        {thisMonthDays.map(
          (day, counter) =>
            counter >= 4 && (
              <TimelineHeaderDaySection
                key={counter}
                day={day}
                daysQnt={thisMonthDays.length}
              />
            )
        )}
        <div className={cvaTimeLineHeaderMonthTitle()}>
          {format(nextMonthDays[0], 'LLLL yy', { locale: ru })}
        </div>
        {nextMonthDays.map(
          (day, counter) =>
            counter >= 4 && (
              <TimelineHeaderDaySection
                key={counter}
                day={day}
                daysQnt={nextMonthDays.length}
              />
            )
        )}
      </div>
    </div>
  );
};

export default TimeLineHeader;
