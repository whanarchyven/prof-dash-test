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

const cvaTodayLineRoot = cva(['relative', 'h-0']);
const cvaTodayLineContainer = cva(['left-0', 'overflow-hidden', 'h-full']);
const cvaTodayLine = cva(['absolute z-[99999]', 'h-screen w-[30px]']);

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
  const todayOffset = calculateDaysQnt(startPeriod, new Date()).length * 30;

  return (
    <div className={cvaTodayLineRoot()}>
      <div
        style={{ width: days.length * 30 }}
        className={cvaTodayLineContainer()}>
        <div
          style={{
            left:
              days.length * 30 -
              (days.length * 30 - todayOffset) -
              scrollState -
              45 -
              15,
          }}
          className={cvaTodayLine()}>
          <DaySection
            date={new Date()}
            displayDay
            displayTopArrow
            displayBottomArrow
          />
        </div>
      </div>
    </div>
  );
};

export default TimeLineHeader;
