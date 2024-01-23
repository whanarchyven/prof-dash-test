'use client';
import { cva } from 'class-variance-authority';
import { FC, useState } from 'react';

export interface DaySectionProps {
  date: Date;
}
const cvaDaySectionRoot = cva(['w-[30px] h-full', 'flex justify-center']);
const cvaDaySectionMark = cva(['h-full w-[1px]'], {
  variants: {
    state: {
      false: 'bg-cGrayUltraLight',
      true: 'bg-cGrayLight',
    },
  },
});

const DaySection: FC<DaySectionProps> = ({ date }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      className={cvaDaySectionRoot()}>
      <div className={cvaDaySectionMark({ state: hover })}>
        <p className={'-rotate-90 text-[12px] mt-10'}>
          {date.toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default DaySection;
