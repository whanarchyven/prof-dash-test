'use client';
import { cva } from 'class-variance-authority';
import { FC, useState } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import TodayLineTriangle from '../../../../../public/icons/today_line_triangle.svg';

export interface DaySectionProps {
  date: Date;
  isFilled?: boolean;
  isUnfilled?: boolean;
  displayDay?: boolean;
  displayTopArrow?: boolean;
  displayBottomArrow?: boolean;
}

const cvaDaySectionRoot = cva(['w-[30px] h-full', 'flex justify-center']);
const cvaDaySectionMark = cva(['h-full relative w-[1px]'], {
  variants: {
    state: {
      false: 'bg-cGrayUltraLight',
      true: 'bg-cGrayLight',
      filled: 'bg-cBlack bg-opacity-[0.34]',
      today: 'bg-cBlue',
      isUnfilled: 'bg-transparent',
    },
  },
});

const cvaArrowTop = cva(['absolute -top-0.3', 'rotate-180 w-0.8 h-0.8']);
const cvaArrowBottom = cva(['absolute bottom-[17.5rem]', ' w-0.8 h-0.8']);
const cvaDayTitle = cva([
  'absolute z-10 top-1',
  'p-0.5 rounded-r-lg bg-cBlue',
  'text-[1.3rem] whitespace-nowrap text-cWhite',
]);

const DaySection: FC<DaySectionProps> = ({
  date,
  isFilled,
  isUnfilled,
  displayDay,
  displayBottomArrow,
  displayTopArrow,
}) => {
  const [hover, setHover] = useState(false);
  const isToday = date.toLocaleDateString() == new Date().toLocaleDateString();
  return (
    <div
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      className={cvaDaySectionRoot()}>
      <div
        className={cvaDaySectionMark({
          state: isToday
            ? 'today'
            : isFilled
              ? 'filled'
              : isUnfilled
                ? 'isUnfilled'
                : hover,
        })}>
        {isToday && displayDay && (
          <div className={cvaDayTitle()}>
            {format(date, 'dd MMM', { locale: ru })}
          </div>
        )}
      </div>
      {isToday && displayTopArrow && (
        <div className={cvaArrowTop()}>
          <TodayLineTriangle />
        </div>
      )}
      {isToday && displayBottomArrow && (
        <div className={cvaArrowBottom()}>
          <TodayLineTriangle />
        </div>
      )}
    </div>
  );
};

export default DaySection;
