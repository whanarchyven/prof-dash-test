import React, { useRef, useState } from 'react';
import {
  calculateStageMarginLeft,
  calculateStageMarginTop,
  calculateStageWidth,
} from '@/features/timeline/utils/calculateStageParameters';
import { differenceInDays } from 'date-fns';
import StageItem, { StageItemProps } from '@/entities/stage-item/ui';
import { cva } from 'class-variance-authority';
import DaySection from '@/shared/ui/day-section/ui';
import { AnimatePresence, motion } from 'framer-motion';

const animateMagnetLineVariantsRight = {
  hidden: { opacity: '0', x: '5%' },
  visible: { opacity: '1', x: '0' },
};

const animateMagnetLineVariantsLeft = {
  hidden: { opacity: '0', x: '-5%' },
  visible: { opacity: '1', x: '0' },
};

interface CalulatedStageItem {
  stageItem: {
    level?: number;
    dateStart: Date;
    dateEnd: Date;
    stageInfo: StageItemProps;
  };
  startPeriod: Date;
}

const cvaStage = cva(['absolute z-[20]']);
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
  const width = calculateStageWidth(stageItem.dateStart, stageItem.dateEnd);
  const marginLeft = calculateStageMarginLeft(startPeriod, stageItem.dateStart);
  const marginTop = calculateStageMarginTop(stageItem.level ?? 0);
  const isStageShort =
    differenceInDays(stageItem.dateEnd, stageItem.dateStart) < 6;

  const magnitRef = useRef<HTMLDivElement>(null);

  const [displayRightMagnet, setDisplayRightMagnet] = useState(false);
  const [displayLeftMagnet, setDisplayLeftMagnet] = useState(false);

  return (
    <div
      ref={magnitRef}
      style={{ width: width, left: marginLeft, top: marginTop, zIndex: 0 }}
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
                date={stageItem.dateEnd}
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
                date={stageItem.dateStart}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <StageItem isShort={isStageShort} {...stageItem.stageInfo} />
    </div>
  );
};

export default CalculatedStageItem;
