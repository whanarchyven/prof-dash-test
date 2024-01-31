'use client';
import { cva } from 'class-variance-authority';
import { FC, useEffect, useRef, useState } from 'react';
import CardItem, { CardItemProps } from '@/entities/card-item/ui';
import TimeLine, { TimeLineProps } from '@/features/timeline';

export interface StageCardInterface {
  task: CardItemProps;
  stages: TimeLineProps['stages'];
  startPeriod: Date;
  endPeriod: Date;
}

const cvaStageCardRoot = cva(['grid grid-cols-12 gap-1', 'w-full', 'relative']);
const cvaStageTaskCard = cva(['col-span-4']);
const cvaStageTimelineBlock = cva([
  'col-span-8',
  'overflow-hidden',
  'rounded-2xl',
  'relative',
]);

const StageCard: FC<StageCardInterface> = ({
  task,
  stages,
  startPeriod,
  endPeriod,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [maxContainerWidth, setMaxCointainerWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setMaxCointainerWidth(containerRef.current.offsetWidth);
    }
  }, [containerRef]);

  return (
    <div ref={containerRef} className={cvaStageCardRoot()}>
      <div className={cvaStageTaskCard()}>
        <CardItem {...task} />
      </div>
      <div className={cvaStageTimelineBlock()}>
        <TimeLine
          startPeriod={startPeriod}
          endPeriod={endPeriod}
          stages={stages}
          maxWidth={maxContainerWidth}
        />
      </div>
    </div>
  );
};

export default StageCard;
