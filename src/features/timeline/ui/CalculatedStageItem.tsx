import React from 'react';
import {
  calculateStageMarginLeft,
  calculateStageMarginTop,
  calculateStageWidth,
} from '@/features/timeline/utils/calculateStageParameters';
import { differenceInDays } from 'date-fns';
import StageItem, { StageItemProps } from '@/entities/stage-item/ui';
import { cva } from 'class-variance-authority';

interface CalulatedStageItem {
  stageItem: {
    level?: number;
    dateStart: Date;
    dateEnd: Date;
    stageInfo: StageItemProps;
  };
  startPeriod: Date;
}

const cvaStage = cva(['absolute z-[9999]']);

const CalculatedStageItem = ({
  stageItem,
  startPeriod,
}: CalulatedStageItem) => {
  const width = calculateStageWidth(stageItem.dateStart, stageItem.dateEnd);
  const marginLeft = calculateStageMarginLeft(startPeriod, stageItem.dateStart);
  const marginTop = calculateStageMarginTop(stageItem.level ?? 0);
  const isStageShort =
    differenceInDays(stageItem.dateEnd, stageItem.dateStart) < 6;

  return (
    <div
      style={{ width: width, left: marginLeft, top: marginTop }}
      className={cvaStage()}>
      <StageItem isShort={isStageShort} {...stageItem.stageInfo} />
    </div>
  );
};

export default CalculatedStageItem;
