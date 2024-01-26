'use client';
import { cva } from 'class-variance-authority';
import { FC, useEffect, useRef, useState } from 'react';
import DaySection from '@/shared/ui/day-section/ui';
import { areIntervalsOverlapping } from 'date-fns';
import { StageItemProps } from '@/entities/stage-item/ui';
import { timelineSelectors } from '@/shared/store/timelineSlice';
import { useAppSelector } from '@/shared/store/hooks/useAppSelector';
import {
  getNextMonthLastDay,
  getPrevMonthLastDay,
  getThisMonthLastDay,
  getMonthDays,
} from '@/features/timeline/utils/getMonths';
import { useSlider } from '@/features/timeline/hooks/useSlider';
import CalculatedStageItem from '@/features/timeline/ui/CalculatedStageItem';

export interface TimeLineProps {
  stages: {
    level?: number;
    dateStart: Date;
    dateEnd: Date;
    stageInfo: StageItemProps;
  }[];
}

const cvaTimeLineRoot = cva([
  'w-fit max-w-full bg-white h-full rounded-xl',
  'overflow-x-scroll',
  'timeline-items',
]);
const cvaTimeLine = cva(['flex w-fit relative h-full']);

const TimeLine: FC<TimeLineProps> = ({ stages }) => {
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

  return (
    <div ref={timeLineRef} className={cvaTimeLineRoot()}>
      {/*<div className={cvaTimeLine()}>*/}
      {/*    */}
      {/*</div>*/}
      <div className={cvaTimeLine()}>
        {prevMonthDays.map((day, counter) => (
          <DaySection key={counter} date={day} />
        ))}
        {thisMonthDays.map((day, counter) => (
          <DaySection key={counter} date={day} />
        ))}
        {nextMonthDays.map((day, counter) => (
          <DaySection key={counter} date={day} />
        ))}
        {stages.map((item, counter) => (
          <CalculatedStageItem
            key={counter}
            stageItem={item}
            startPeriod={prevMonthDays[0]}
          />
        ))}
      </div>
    </div>
  );
};

export default TimeLine;
