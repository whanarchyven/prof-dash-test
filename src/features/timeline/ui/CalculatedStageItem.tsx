import React, { useRef, useState } from 'react';
import {
  calculateStageMarginLeft,
  calculateStageMarginTop,
  calculateStageWidth,
} from '@/features/timeline/utils/calculateStageParameters';
import { differenceInDays } from 'date-fns';
import StageItem from '@/entities/stage-item/ui';
import { cva } from 'class-variance-authority';
import DaySection from '@/shared/ui/day-section/ui';
import { AnimatePresence, motion } from 'framer-motion';
import { IStage } from '@/features/stage-card/types/IStage';
import { formatDuration } from '@/shared/utils/formatters';

const animateMagnetLineVariantsRight = {
  hidden: { opacity: '0', x: '5%' },
  visible: { opacity: '1', x: '0' },
};

const animateMagnetLineVariantsLeft = {
  hidden: { opacity: '0', x: '-5%' },
  visible: { opacity: '1', x: '0' },
};

interface CalulatedStageItem {
  stageItem: IStage;
  startPeriod: Date;
}

const cvaStage = cva(['absolute z-[revert]']);
const cvaStageRightMagnet = cva([
  'absolute z-50 -right-[30px] w-[60px] flex justify-center h-full pointer-none',
]);
const cvaStageLeftMagnet = cva([
  'absolute z-50 -left-[30px] w-[60px] h-full pointer-none',
]);
const cvaStageMagnet = cva([
  'fixed top-0 z-[99999]',
  'w-[60px] h-full',
  'flex justify-center',
]);

const CalculatedStageItem = ({
  stageItem,
  startPeriod,
}: CalulatedStageItem) => {
  const magnitRef = useRef<HTMLDivElement>(null);

  const [displayRightMagnet, setDisplayRightMagnet] = useState(false);
  const [displayLeftMagnet, setDisplayLeftMagnet] = useState(false);

  if (stageItem.end == null || stageItem.start == null) {
    return null;
  }

  const dateStart = new Date(String(stageItem.start));
  const dateEnd = new Date(String(stageItem.end));

  const width = calculateStageWidth(dateStart, dateEnd);
  const marginLeft = calculateStageMarginLeft(startPeriod, dateStart);
  const marginTop = calculateStageMarginTop(stageItem.level ?? 0);
  const isStageShort = differenceInDays(dateEnd, dateStart) < 6;

  return (
    <div
      ref={magnitRef}
      style={{ width: width, left: marginLeft, top: marginTop }}
      className={cvaStage()}>
      <div
        onMouseEnter={() => {
          setDisplayRightMagnet(true);
        }}
        onMouseLeave={() => {
          setDisplayRightMagnet(false);
        }}
        className={cvaStageRightMagnet()}>
        <AnimatePresence>
          {displayRightMagnet && (
            <motion.div
              variants={animateMagnetLineVariantsRight}
              initial={'hidden'}
              animate={'visible'}
              exit={'hidden'}
              className={cvaStageMagnet()}>
              <DaySection
                magnet
                displayDay
                displayTopArrow
                displayBottomArrow
                date={dateEnd}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div
        onMouseEnter={() => {
          setDisplayLeftMagnet(true);
        }}
        onMouseLeave={() => {
          setDisplayLeftMagnet(false);
        }}
        className={cvaStageLeftMagnet()}>
        <AnimatePresence>
          {displayLeftMagnet && (
            <motion.div
              variants={animateMagnetLineVariantsLeft}
              initial={'hidden'}
              animate={'visible'}
              exit={'hidden'}
              className={cvaStageMagnet()}>
              <DaySection
                magnet
                displayDay
                displayTopArrow
                displayBottomArrow
                date={dateStart}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {stageItem.end && stageItem.start && (
        <StageItem
          isShort={isStageShort}
          {...stageItem}
          category={'time'}
          fact={formatDuration(stageItem.timeSpent)}
          plan={formatDuration(stageItem.estimate)}
          invoice={stageItem?.invoice}
        />
      )}
    </div>
  );
};

export default CalculatedStageItem;
