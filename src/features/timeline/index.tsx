'use client';
import { cva } from 'class-variance-authority';
import { FC, useEffect, useRef, useState } from 'react';
import DaySection from '@/shared/ui/day-section/ui';
import {
  subMonths,
  addMonths,
  lastDayOfMonth,
  differenceInDays,
  areIntervalsOverlapping,
} from 'date-fns';
import StageItem, { StageItemProps } from '@/entities/stage-item/ui';
import { useAppDispatch } from '@/shared/store/hooks/useAppDispatch';
import { store } from '@/shared/store/store';
import { setScroll } from '@/shared/store/timelineSlice';
import { useAppSelector } from '@/shared/store/hooks/useAppSelector';

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
  'timeline-items',
]);
const cvaTimeLine = cva(['flex w-fit relative h-full']);

const cvaStage = cva(['absolute z-[9999]']);

const calculateStageWidth = (start: Date, end: Date) => {
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

  const dispatch = useAppDispatch();

  const timeLineRef = useRef<HTMLDivElement>(null);

  const storeScrollState = useAppSelector((state) => state.timelineSlice);

  const [scrollState, setScrollState] = useState(0);

  useEffect(() => {
    const slider = timeLineRef.current;
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    if (slider) {
      slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      });
      slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
      });
      slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
      });
      slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        slider.scrollLeft = scrollLeft - walk;
        dispatch(setScroll(scrollLeft - walk));
      });
    }
    console.log(store.getState().timelineSlice.timeLineScroll);
  }, []);

  useEffect(() => {
    // console.log(storeScrollState.timeLineScroll)
    setScrollState(storeScrollState.timeLineScroll);
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
          const width = calculateStageWidth(item.dateStart, item.dateEnd);
          const marginLeft = calculateStageMargin(
            prevMonthDays[0],
            item.dateStart
          );
          const marginTop = 1 + (item.level ?? 0) * 13 + 'rem';

          const isStageShort =
            differenceInDays(item.dateEnd, item.dateStart) < 6;

          return (
            <div
              key={counter}
              style={{ width: width, left: marginLeft, top: marginTop }}
              className={cvaStage()}>
              <StageItem isShort={isStageShort} {...item.stageInfo} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimeLine;
