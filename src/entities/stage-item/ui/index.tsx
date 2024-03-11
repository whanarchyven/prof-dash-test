'use client';
import { cva } from 'class-variance-authority';
import { FC, useState } from 'react';
import TaskTimer, { TaskTimerProps } from '@/shared/ui/task-timer/ui';
import TaskProgress from '@/shared/ui/task-progress/ui';
import InvoiceProgress from '@/shared/ui/invoice-progress/ui/InvoiceProgress';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { IStage } from '@/features/stage-card/types/IStage';
import { formatDuration } from '@/shared/utils/formatters';

export interface StageItemProps extends IStage, Omit<TaskTimerProps, 'status'> {
  isShort: boolean;
}

const cvaRoot = cva(['flex flex-col gap-0.4', 'w-full', 'relative'], {
  variants: {},
});
const cvaInvoiceBlock = cva(['flex justify-end gap-2']);
const cvaFullDescBlock = cva([
  'min-w-[300px] w-fit',
  'absolute top-0 left-[100%] z-50',
  'border-l-2 border-white',
]);

const animateFullDescriptionVariants = {
  open: { x: '0%', opacity: 1 },
  closed: { x: '-5%', opacity: 0 },
};

const StageItem: FC<StageItemProps> = ({
  estimate,
  timeSpent,
  status,
  isShort,
  height,
  completed,
  invoice,
  name,
}) => {
  const [isShortDisplay, setIsShortDisplay] = useState<boolean>(false);
  const handleHover = (value: boolean) => {
    setIsShortDisplay(value);
  };

  const calculateTaskProgressCompletePercent = (
    completeDuration: string,
    estimateDuration: string
  ) => {
    return (
      (formatDuration(completeDuration) / formatDuration(estimateDuration)) *
      100
    );
  };

  return (
    <div
      onMouseEnter={() => {
        isShort && handleHover(true);
      }}
      onMouseLeave={() => {
        isShort && handleHover(false);
      }}
      onClick={() => {}}
      className={cvaRoot({})}>
      <TaskTimer
        isShort={isShort ?? false}
        category={'time'}
        fact={formatDuration(timeSpent)}
        status={status}
        plan={formatDuration(estimate)}
        height={height}
      />
      <TaskProgress
        isShort={isShort ?? false}
        task={name}
        completePercent={calculateTaskProgressCompletePercent(
          completed,
          estimate
        )}
        status={status}></TaskProgress>
      {!isShortDisplay && invoice && (
        <div className={cvaInvoiceBlock()}>
          <InvoiceProgress amount={invoice?.amount} status={invoice?.status} />
        </div>
      )}
      <AnimatePresence>
        {isShortDisplay && (
          <motion.div
            variants={animateFullDescriptionVariants}
            initial={'closed'}
            animate={'open'}
            exit={'closed'}
            className={cvaFullDescBlock()}>
            <div className={cvaRoot({})}>
              <TaskTimer
                isShort={isShort ?? false}
                category={'time'}
                fact={formatDuration(estimate)}
                status={status}
                plan={formatDuration(timeSpent)}
                height={height}
              />
              <TaskProgress
                isShort={isShort ?? false}
                task={name}
                completePercent={Number(completed)}
                status={status}></TaskProgress>
              {invoice && (
                <div className={cvaInvoiceBlock()}>
                  <InvoiceProgress
                    amount={invoice?.amount}
                    status={invoice?.status}
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StageItem;
