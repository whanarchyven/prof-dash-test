'use client';
import { cva } from 'class-variance-authority';
import { FC, useEffect, useRef, useState } from 'react';
import { setScroll, timelineSelectors } from '@/shared/store/timelineSlice';
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
import { useAppDispatch } from '@/shared/store/hooks/useAppDispatch';
import TodayBtn from '@/features/timeline/ui/today-btn';
import { AnimatePresence } from 'framer-motion';

export interface TimeLineHeaderProps {}

const cvaTimeLineRoot = cva('h-3 flex justify-end relative');

const cvaTimeLineContainer = cva([
  'w-fit max-w-full  h-full min-h-3 rounded-xl',
  'overflow-x-scroll',
  'timeline-header-items',
]);
const cvaTimeLine = cva(['flex w-fit relative h-full']);

const cvaTimeLineHeaderMonthTitle = cva([
  'w-[120px] font-secondary capitalize flex items-end justify-center text-sm',
]);

const TimeLineHeader: FC<TimeLineHeaderProps> = () => {
  const prevMonthDays = getMonthDays(getPrevMonthLastDay());
  const thisMonthDays = getMonthDays(getThisMonthLastDay());
  const nextMonthDays = getMonthDays(getNextMonthLastDay());

  const dispatch = useAppDispatch();

  const timeLineRef = useRef<HTMLDivElement>(null);

  const storeScrollState = useAppSelector(timelineSelectors.timeLineScroll);

  const [scrollState, setScrollState] = useState(0);

  const todayOffset = (prevMonthDays.length + new Date().getDate()) * 30;

  const [isTodayLineVisible, setIsTodayLineVisible] = useState(false);
  const checkIsTodayLineVisible = (
    currentOffset: number,
    todayOffset: number,
    areaWidth: number
  ) => {
    return (
      todayOffset >= currentOffset && todayOffset <= currentOffset + areaWidth
    );
  };

  useSlider(timeLineRef);

  useEffect(() => {
    // console.log(storeScrollState.timeLineScroll)
    setScrollState(storeScrollState);
    if (timeLineRef.current) {
      setIsTodayLineVisible(
        checkIsTodayLineVisible(
          storeScrollState,
          todayOffset,
          timeLineRef.current.offsetWidth
        )
      );
    }
  }, [storeScrollState]);

  useEffect(() => {
    timeLineRef.current?.scrollTo(scrollState, 0);
    // console.log(scrollState,'ScrollTo')
  }, [scrollState]);

  console.log(todayOffset);

  return (
    <div className={cvaTimeLineRoot()}>
      <AnimatePresence>
        {!isTodayLineVisible && (
          <TodayBtn
            onClick={() => {
              dispatch(setScroll(todayOffset));
            }}
          />
        )}
      </AnimatePresence>
      <div ref={timeLineRef} className={cvaTimeLineContainer()}>
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
    </div>
  );
};

export default TimeLineHeader;
