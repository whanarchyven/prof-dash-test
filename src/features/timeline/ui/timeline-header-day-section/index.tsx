'use client';
import { cva } from 'class-variance-authority';
import { FC } from 'react';
import DaySection from '@/shared/ui/day-section/ui';

interface TimelineHeaderDaySectionProps {
  day: Date;
  isFullHeight: boolean;
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
  isFullHeight,
}) => {
  return (
    <div className={cvaRoot()}>
      <div
        className={cvaSection({
          height: isFullHeight ? 'full' : 'half',
        })}>
        <DaySection isFilled date={day} />
      </div>
    </div>
  );
};

export default TimelineHeaderDaySection;
