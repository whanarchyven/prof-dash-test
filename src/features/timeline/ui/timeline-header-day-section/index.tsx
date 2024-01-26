'use client';
import { cva } from 'class-variance-authority';
import { FC } from 'react';
import DaySection from '@/shared/ui/day-section/ui';

interface TimelineHeaderDaySectionProps {
  day: Date;
  daysQnt: number;
}

const cvaRoot = cva(['flex flex-col h-full justify-end']);
const cvaSection = cva([''], {
  variants: {
    height: {
      full: 'h-full',
      half: 'h-1/2',
    },
  },
});
const TimelineHeaderDaySection: FC<TimelineHeaderDaySectionProps> = ({
  day,
  daysQnt,
}) => {
  return (
    <div className={cvaRoot()}>
      <div
        className={cvaSection({
          height: Math.floor(daysQnt / 2) == day.getDate() ? 'full' : 'half',
        })}>
        <DaySection isFilled date={day} />
      </div>
    </div>
  );
};

export default TimelineHeaderDaySection;
