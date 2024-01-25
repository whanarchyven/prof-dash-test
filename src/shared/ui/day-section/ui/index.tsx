'use client';
import { cva } from 'class-variance-authority';
import { FC, useState } from 'react';

export interface DaySectionProps {
  date: Date;
}
const cvaDaySectionRoot = cva(['w-[30px] h-full', 'flex justify-center']);
const cvaDaySectionMark = cva(['h-full relative w-[1px]'], {
  variants: {
    state: {
      false: 'bg-cGrayUltraLight',
      true: 'bg-cGrayLight',
      today: 'bg-cBlue',
    },
  },
});

const DaySection: FC<DaySectionProps> = ({ date }) => {
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
      <div className={cvaDaySectionMark({ state: isToday ? 'today' : hover })}>
        {isToday && hover && (
          <div
            className={
              'absolute z-10 p-0.5 rounded-r-lg bg-cBlue text-[1.3rem] whitespace-nowrap text-cWhite'
            }>
            {date.toLocaleDateString('default', {
              month: 'short',
              day: '2-digit',
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DaySection;
