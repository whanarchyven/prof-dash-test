'use client';
import { cva } from 'class-variance-authority';
import { FC, useEffect, useRef, useState } from 'react';
import { timelineSelectors } from '@/shared/store/timelineSlice';
import { useAppSelector } from '@/shared/store/hooks/useAppSelector';
import DaySection from '@/shared/ui/day-section/ui';
import { calculateDaysQnt } from '@/features/timeline/utils/calculateDaysQnt';

export interface TodayLineProps {
  startPeriod: Date;
  endPeriod: Date;
}

const cvaTodayLineRoot = cva(['relative', 'h-0']);
const cvaTodayLine = cva([
  'absolute z-[99999]',
  'h-screen w-[30px]',
  'pointer-events-none',
]);

const TodayLine: FC<TodayLineProps> = ({ startPeriod }) => {
  const timeLineRef = useRef<HTMLDivElement>(null);

  const storeScrollState = useAppSelector(timelineSelectors.timeLineScroll);

  const [scrollState, setScrollState] = useState(0);

  useEffect(() => {
    setScrollState(storeScrollState);
  }, [storeScrollState]);

  useEffect(() => {
    timeLineRef.current?.scrollTo(scrollState, 0);
  }, [scrollState]);
  const todayOffset = calculateDaysQnt(startPeriod, new Date()).length * 30;

  return (
    <div className={cvaTodayLineRoot()}>
      <div
        style={{
          transform: `translate(${todayOffset - scrollState}px,0px)`,
          left: '-30px',
        }}
        className={cvaTodayLine()}>
        <DaySection
          date={new Date()}
          displayDay
          displayTopArrow
          displayBottomArrow
          displayTodayMark
        />
      </div>
    </div>
  );
};

export default TodayLine;
