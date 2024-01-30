'use client';
import { cva } from 'class-variance-authority';
import { FC } from 'react';
import CardItem, { CardItemProps } from '@/entities/card-item/ui';
import TimeLine, { TimeLineProps } from '@/features/timeline';

export interface StageCardInterface {
  task: CardItemProps;
  stages: TimeLineProps['stages'];
  isFirstCard?: boolean;
  isLastCard?: boolean;
}

const cvaStageCardRoot = cva(['grid grid-cols-12 gap-1 w-full']);
const cvaStageTaskCard = cva(['col-span-4']);
const cvaStageTimelineBlock = cva([
  'col-span-8',
  'relative',
  'overflow-hidden',
  'rounded-2xl',
]);

const StageCard: FC<StageCardInterface> = ({
  task,
  stages,
  isFirstCard,
  isLastCard,
}) => {
  return (
    <div className={cvaStageCardRoot()}>
      <div className={cvaStageTaskCard()}>
        <CardItem {...task} />
      </div>
      <div className={cvaStageTimelineBlock()}>
        <TimeLine
          isFirstCard={isFirstCard ?? false}
          isLastCard={isLastCard ?? false}
          stages={stages}
        />
      </div>
    </div>
  );
};

export default StageCard;
