'use client';
import { cva } from 'class-variance-authority';
import { FC, ReactNode } from 'react';
import ArrowRightIcon from '/public/icons/arrow_right.svg';
import { motion } from 'framer-motion';
import { useAppDispatch } from '@/shared/store/hooks/useAppDispatch';
import { setScroll } from '@/shared/store/timelineSlice';

export interface stageNotificationInterface {
  scrollTo: number;
  children: ReactNode;
}

const cvaStageNotificationRoot = cva([
  'flex gap-1 items-center',
  'cursor-pointer',
]);
const cvaStageNotificationIconBlock = cva([
  'flex items-center justify-center',
  'bg-white shadow-xl',
  'w-3 h-3',
  'rounded-full',
  'p-1',
]);
const cvaStageNotificationIcon = cva(['stroke-cBlack rotate-180']);
const cvaStageNotificationBody = cva([
  'flex items-center justify-center',
  'bg-white shadow-xl',
  'text-xs font-secondary text-opacity-50',
  'rounded-full',
  'p-1',
]);

const animateStageNotificationVariants = {
  closed: {
    x: '-5%',
    opacity: 0,
  },
  open: {
    x: '0%',
    opacity: 1,
  },
};
const StageNotification: FC<stageNotificationInterface> = ({
  children,
  scrollTo,
}) => {
  const dispatch = useAppDispatch();
  return (
    <motion.div
      onClick={() => {
        dispatch(setScroll(scrollTo));
      }}
      variants={animateStageNotificationVariants}
      initial={'closed'}
      animate={'open'}
      exit={'closed'}
      className={cvaStageNotificationRoot()}>
      <div className={cvaStageNotificationIconBlock()}>
        <ArrowRightIcon className={cvaStageNotificationIcon()} />
      </div>
      <div className={cvaStageNotificationBody()}>{children}</div>
    </motion.div>
  );
};

export default StageNotification;
