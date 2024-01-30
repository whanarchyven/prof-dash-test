'use client';
import { cva } from 'class-variance-authority';
import { FC, useEffect, useRef, useState } from 'react';
import { setScroll, timelineSelectors } from '@/shared/store/timelineSlice';
import { useAppSelector } from '@/shared/store/hooks/useAppSelector';
import { useSlider } from '@/features/timeline/hooks/useSlider';
import { addDays, endOfMonth, format, startOfMonth } from 'date-fns';
import TimelineHeaderDaySection from '@/features/timeline/ui/timeline-header-day-section';
import { useAppDispatch } from '@/shared/store/hooks/useAppDispatch';
import TodayBtn from '@/features/timeline/ui/today-btn';
import { AnimatePresence } from 'framer-motion';
import { calculateDaysQnt } from '@/features/timeline/utils/calculateDaysQnt';
import { ru } from 'date-fns/locale';

export interface TimeLineHeaderProps {
  startPeriod: Date;
  endPeriod: Date;
}

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

const TimeLineHeader: FC<TimeLineHeaderProps> = ({
  startPeriod,
  endPeriod,
}) => {
  const dispatch = useAppDispatch();

  const timeLineRef = useRef<HTMLDivElement>(null);
  const fullTimeLineRef = useRef<HTMLDivElement>(null);

  const storeScrollState = useAppSelector(timelineSelectors.timeLineScroll);

  const [scrollState, setScrollState] = useState(0);

  const days = calculateDaysQnt(startPeriod, endPeriod);

  const todayOffset = calculateDaysQnt(startPeriod, new Date()).length * 30;

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

  useSlider(timeLineRef, days.length * 30);

  useEffect(() => {
    //
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
  }, [scrollState]);

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
        <div ref={fullTimeLineRef} className={cvaTimeLine()}>
          {days.map((day, counter) => {
            //дальше костыль, продумать как унифицировать
            const isSkipping =
              addDays(startOfMonth(day), 0).getDate() == day.getDate() ||
              addDays(startOfMonth(day), 1).getDate() == day.getDate() ||
              addDays(startOfMonth(day), 2).getDate() == day.getDate() ||
              addDays(startOfMonth(day), 3).getDate() == day.getDate();
            if (!isSkipping) {
              return (
                <TimelineHeaderDaySection
                  key={counter}
                  day={day}
                  isFullHeight={day.getDate() == endOfMonth(day).getDate()}
                />
              );
            } else {
              if (day.getDate() == startOfMonth(day).getDate()) {
                return (
                  <div key={counter} className={cvaTimeLineHeaderMonthTitle()}>
                    {format(startOfMonth(day), 'LLLL yy', { locale: ru })}
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

export default TimeLineHeader;
