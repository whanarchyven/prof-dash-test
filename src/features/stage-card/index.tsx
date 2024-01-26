'use client';
import { cva } from 'class-variance-authority';
import { FC } from 'react';
import CardItem, { CardItemProps } from '@/entities/card-item/ui';
import TimeLine, { TimeLineProps } from '@/features/timeline';

export interface StageCardInterface {
  task: CardItemProps;
  stages: TimeLineProps['stages'];
}

const cvaStageCardRoot = cva(['grid grid-cols-12 gap-1 w-full']);
const cvaStageTaskCard = cva(['col-span-4']);
const cvaStageTimelineBlock = cva(['col-span-8']);

const StageCard: FC<StageCardInterface> = ({ task, stages }) => {
  return (
    <div className={cvaStageCardRoot()}>
      <div className={cvaStageTaskCard()}>
        <CardItem {...task} />
      </div>
      <div className={cvaStageTimelineBlock()}>
        <TimeLine stages={stages} />
      </div>
    </div>
  );
};

export default StageCard;
