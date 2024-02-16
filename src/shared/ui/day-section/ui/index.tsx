'use client';
import { cva } from 'class-variance-authority';
import { FC, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import TodayLineTriangle from '/public/icons/today_line_triangle.svg';

export interface DaySectionProps {
  date: Date;
  isFilled?: boolean;
  isUnfilled?: boolean;
  displayTodayMark?: boolean;
  displayDay?: boolean;
  displayTopArrow?: boolean;
  displayBottomArrow?: boolean;
  magnet?: boolean;
}

const cvaDaySectionRoot = cva(['w-[30px] h-full', 'flex justify-center']);
const cvaDaySectionMark = cva(['h-full relative w-[1px]'], {
  variants: {
    state: {
      false: 'bg-cGrayUltraLight',
      true: 'bg-cGrayLight',
      filled: 'bg-cBlack bg-opacity-[0.34]',
      today: 'bg-cBlue',
      magnet: 'bg-cGray',
      isUnfilled: 'bg-transparent',
    },
  },
});

const cvaTodayLineTriangle = cva([''], {
  variants: {
    state: {
      magnet: 'fill-cGray',
      today: 'fill-cBlue',
    },
  },
  defaultVariants: { state: 'today' },
});

const cvaArrowTop = cva(['absolute -top-0.3', 'rotate-180', 'w-0.8 h-0.8']);
const cvaArrowBottom = cva(['absolute bottom-[15.3rem]', ' w-0.8 h-0.8']);
const cvaDayTitle = cva(
  [
    'absolute z-10 top-1',
    'p-0.5 rounded-r-lg',
    'text-xs whitespace-nowrap text-cWhite',
  ],
  { variants: { state: { magnet: 'bg-cGray', today: 'bg-cBlue' } } }
);

const DaySection: FC<DaySectionProps> = ({
  date,
  isFilled,
  isUnfilled,
  displayDay,
  displayTodayMark,
  displayBottomArrow,
  displayTopArrow,
  magnet,
}) => {
  const [hover, setHover] = useState<boolean>(false);
  const [isToday, setIsToday] = useState(
    date.toLocaleDateString() == new Date().toLocaleDateString()
  );

  useEffect(() => {
    if (magnet) {
      setIsToday(true);
    } else {
      setIsToday(date.toLocaleDateString() == new Date().toLocaleDateString());
    }
  }, [magnet]);

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
          state: magnet
            ? 'magnet'
            : isToday && displayTodayMark
              ? 'today'
              : isFilled
                ? 'filled'
                : isUnfilled
                  ? 'isUnfilled'
                  : hover,
        })}>
        {isToday && displayDay && (
          <div className={cvaDayTitle({ state: magnet ? 'magnet' : 'today' })}>
            {format(date, 'dd MMM', { locale: ru })}
          </div>
        )}
      </div>
      {isToday && displayTopArrow && (
        <div className={cvaArrowTop()}>
          <TodayLineTriangle
            className={cvaTodayLineTriangle({
              state: magnet ? 'magnet' : 'today',
            })}
          />
        </div>
      )}
      {isToday && displayBottomArrow && (
        <div className={cvaArrowBottom()}>
          <TodayLineTriangle
            className={cvaTodayLineTriangle({
              state: magnet ? 'magnet' : 'today',
            })}
          />
        </div>
      )}
    </div>
  );
};

export default DaySection;
