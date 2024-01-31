'use client';
import { cva } from 'class-variance-authority';
import { FC, useState } from 'react';
import TaskTimer, { TaskTimerProps } from '@/shared/ui/task-timer/ui';
import TaskProgress, { TaskProgressProps } from '@/shared/ui/task-progress/ui';
import InvoiceProgress, {
  InvoiceProgressProps,
} from '@/shared/ui/invoice-progress/ui/InvoiceProgress';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';

export interface StageItemProps extends TaskTimerProps {
  taskProgressStatus: TaskProgressProps['status'];
  taskProgressCompletePercent: TaskProgressProps['completePercent'];
  task: TaskProgressProps['task'];
  prepayment?: InvoiceProgressProps;
  payment: InvoiceProgressProps;
}

const cvaRoot = cva(['flex flex-col gap-0.4', 'w-full', 'relative'], {
  variants: {},
});
const cvaInvoiceBlock = cva(['flex justify-between gap-2']);
const cvaFullDescBlock = cva([
  'min-w-[300px] w-fit',
  'absolute top-0 left-[15%] z-50',
  'border-l-2 border-white',
]);

const animateFullDescriptionVariants = {
  open: { x: '0%', opacity: 1 },
  closed: { x: '-5%', opacity: 0 },
};

const StageItem: FC<StageItemProps> = ({
  category,
  plan,
  fact,
  status,
  isShort,
  height,
  taskProgressStatus,
  taskProgressCompletePercent,
  payment,
  prepayment,
  task,
}) => {
  const [isShortDisplay, setIsShortDisplay] = useState<boolean>(false);
  const handleHover = (value: boolean) => {
    setIsShortDisplay(value);
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
        isShort={isShort}
        category={category}
        fact={fact}
        status={status}
        plan={plan}
        height={height}
      />
      <TaskProgress
        isShort={isShort ?? false}
        task={task}
        completePercent={taskProgressCompletePercent}
        status={taskProgressStatus}></TaskProgress>
      {!isShortDisplay && (
        <div className={cvaInvoiceBlock()}>
          {prepayment && <InvoiceProgress {...prepayment} />}
          <InvoiceProgress {...payment} />
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
                category={category}
                fact={fact}
                status={status}
                plan={plan}
                height={height}
              />
              <TaskProgress
                task={task}
                completePercent={taskProgressCompletePercent}
                status={taskProgressStatus}></TaskProgress>
              <div className={cvaInvoiceBlock()}>
                {prepayment && <InvoiceProgress {...prepayment} />}
                <InvoiceProgress {...payment} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StageItem;
