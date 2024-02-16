import React, { useRef } from 'react';
import {
  calculateStageMarginLeft,
  calculateStageMarginTop,
  calculateStageWidth,
} from '@/features/timeline/utils/calculateStageParameters';
import { differenceInDays } from 'date-fns';
import StageItem, { StageItemProps } from '@/entities/stage-item/ui';
import { cva } from 'class-variance-authority';
import { useAppDispatch } from '@/shared/store/hooks/useAppDispatch';
import { magnetLineActions } from '@/shared/store/magnitLineSlice';

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
const cvaStageRightMagnet = cva([
  'absolute z-50 -right-[30px] w-[60px] h-full pointer-none',
]);
const cvaStageLeftMagnet = cva([
  'absolute z-50 -left-[30px] w-[60px] h-full pointer-none',
]);

const CalculatedStageItem = ({
  stageItem,
  startPeriod,
}: CalulatedStageItem) => {
  const width = calculateStageWidth(stageItem.dateStart, stageItem.dateEnd);
  const marginLeft = calculateStageMarginLeft(startPeriod, stageItem.dateStart);
  const marginTop = calculateStageMarginTop(stageItem.level ?? 0);
  const isStageShort =
    differenceInDays(stageItem.dateEnd, stageItem.dateStart) < 6;

  const magnitRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  return (
    <div
      ref={magnitRef}
      style={{ width: width, left: marginLeft, top: marginTop }}
      className={cvaStage()}>
      <div
        onMouseEnter={() => {
          if (magnitRef.current) {
            dispatch(magnetLineActions.setDisplay(true));
            dispatch(magnetLineActions.setDate(stageItem.dateEnd));
          }
        }}
        onMouseLeave={() => {
          dispatch(magnetLineActions.setDisplay(false));
        }}
        className={cvaStageRightMagnet()}
      />
      <div
        onMouseEnter={() => {
          if (magnitRef.current) {
            dispatch(magnetLineActions.setDisplay(true));
            dispatch(magnetLineActions.setDate(stageItem.dateStart));
          }
        }}
        onMouseLeave={() => {
          dispatch(magnetLineActions.setDisplay(false));
        }}
        className={cvaStageLeftMagnet()}
      />
      <StageItem isShort={isStageShort} {...stageItem.stageInfo} />
    </div>
  );
};

export default CalculatedStageItem;
