'use client';
import { cva } from 'class-variance-authority';
import { FC, useEffect, useRef, useState } from 'react';
import { timelineSelectors } from '@/shared/store/timelineSlice';
import { useAppSelector } from '@/shared/store/hooks/useAppSelector';
import DaySection from '@/shared/ui/day-section/ui';
import { calculateDaysQnt } from '@/features/timeline/utils/calculateDaysQnt';

export interface TimeLineHeaderProps {
  startPeriod: Date;
  endPeriod: Date;
}

const cvaTimeLineRoot = cva([
  'w-fit max-w-full absolute z-[10] overflow-y-none top-[100%] rounded-xl',
  'overflow-auto',
]);
const cvaTimeLine = cva(['flex w-fit overflow-y-visible relative h-5']);

const TimeLineHeader: FC<TimeLineHeaderProps> = ({
  startPeriod,
  endPeriod,
}) => {
  const timeLineRef = useRef<HTMLDivElement>(null);

  const storeScrollState = useAppSelector(timelineSelectors.timeLineScroll);

  const [scrollState, setScrollState] = useState(0);

  useEffect(() => {
    // console.log(storeScrollState.timeLineScroll)
    setScrollState(storeScrollState);
  }, [storeScrollState]);

  useEffect(() => {
    timeLineRef.current?.scrollTo(scrollState, 0);
    // console.log(scrollState,'ScrollTo')
  }, [scrollState]);
  const days = calculateDaysQnt(startPeriod, endPeriod);

  return (
    <div ref={timeLineRef} className={cvaTimeLineRoot()}>
      <div className={cvaTimeLine()}>
        {days.map((day, counter) =>
          day.getDate() == new Date().getDate() ? (
            <div key={counter} className={'relative h-screen'}>
              <DaySection
                displayDay={true}
                displayBottomArrow={true}
                displayTopArrow={true}
                isUnfilled
                date={day}
              />
            </div>
          ) : (
            <div key={counter} className={'w-[30px] h-0'}></div>
          )
        )}
      </div>
    </div>
  );
};

export default TimeLineHeader;
