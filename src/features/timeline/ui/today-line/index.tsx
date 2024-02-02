'use client';
import { cva } from 'class-variance-authority';
import { FC, useEffect, useRef, useState } from 'react';
import { timelineSelectors } from '@/shared/store/timelineSlice';
import { useAppSelector } from '@/shared/store/hooks/useAppSelector';
import DaySection from '@/shared/ui/day-section/ui';
import { calculateDaysQnt } from '@/features/timeline/utils/calculateDaysQnt';
import { calculateTodayOffset } from '@/features/timeline/utils/calculateTodayOffset';
import { AnimatePresence } from 'framer-motion';
import { checkIsTodayLineVisible } from '@/features/timeline/ui/timeline-header';
import { containerParametersSelectors } from '@/shared/store/containerWidthSlice';
import { motion } from 'framer-motion';

export interface TodayLineProps {
  startPeriod: Date;
  endPeriod: Date;
}

const cvaTodayLineRoot = cva(['relative', 'h-0']);
const cvaTodayLine = cva([
  'absolute z-[9999]',
  'h-screen w-[30px]',
  'pointer-events-none',
]);

const animateTodayLineVariants = {
  closed: { y: '-5%', opacity: 0 },
  open: { y: '0%', opacity: 1 },
};

const TodayLine: FC<TodayLineProps> = ({ startPeriod, endPeriod }) => {
  const timeLineRef = useRef<HTMLDivElement>(null);

  const storeScrollState = useAppSelector(timelineSelectors.timeLineScroll);
  const containerParams = useAppSelector(
    containerParametersSelectors.containerParameters
  );

  const [scrollState, setScrollState] = useState<number>(0);

  useEffect(() => {
    setScrollState(storeScrollState);
    setIsTodayLineVisible(
      checkIsTodayLineVisible(
        storeScrollState,
        todayOffset,
        containerParams.container,
        containerParams.card
      )
    );
  }, [storeScrollState]);

  useEffect(() => {
    timeLineRef.current?.scrollTo(scrollState, 0);
  }, [scrollState]);
  const maxWidth = (calculateDaysQnt(startPeriod, endPeriod).length - 1) * 30;

  const todayOffset = calculateTodayOffset(startPeriod, new Date(), maxWidth);
  const [isTodayLineVisible, setIsTodayLineVisible] = useState(
    checkIsTodayLineVisible(
      storeScrollState,
      todayOffset,
      containerParams.container,
      containerParams.card
    )
  );
  // console.log(calculateTodayOffset(startPeriod,new Date(),todayOffset))
  return (
    <div className={cvaTodayLineRoot()}>
      <AnimatePresence>
        {isTodayLineVisible && (
          <motion.div
            variants={animateTodayLineVariants}
            initial={'closed'}
            animate={'open'}
            exit={'closed'}>
            <div
              style={{
                transform: `translate(${todayOffset - scrollState}px,0px)`,
              }}
              className={cvaTodayLine()}>
              <DaySection
                date={new Date()}
                displayDay
                displayTopArrow
                displayBottomArrow
                displayTodayMark
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TodayLine;
