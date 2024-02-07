'use client';
import { cva, VariantProps } from 'class-variance-authority';
import { FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export interface TaskProgressProps extends VariantProps<typeof cvaProgress> {
  task: string;
  completePercent?: number;
  isShort?: boolean;
  isDisplayingPercent?: boolean;
}

const cvaRoot = cva(
  ['relative bg-cBlack cursor-pointer bg-opacity-[0.03] overflow-hidden'],
  {
    variants: {
      height: {
        xl: ['h-2 p-1.4'],
        lg: ['h-2 p-1.2'],
        md: ['h-2 p-0.6'],
        sm: ['h-2 p-0.2 px-1'],
        xs: ['h-2 p-0.2'],
      },
      isShort: {
        true: 'w-1.2 rounded-xl',
        false: 'w-full rounded-3xl',
      },
    },
  }
);
const cvaProgress = cva(['absolute z-[-1] left-0 top-0 h-full'], {
  variants: {
    status: {
      completed: ['bg-cGreen w-full'],
      pending: ['bg-cYellow w-full'],
      default: ['bg-transparent'],
    },
    isShort: {
      true: 'rounded-xl',
      false: 'rounded-3xl',
    },
  },
});
const cvaTextBlock = cva(['flex w-full justify-between gap-1 items-end'], {
  variants: {
    status: {
      completed: ['text-cWhite'],
      pending: ['text-cGray'],
      default: ['text-cGray'],
    },
  },
});
const cvaTextSection = cva(['flex w-1/2 flex-col gap-0.3'], {
  variants: {
    align: {
      left: 'w-2/3',
      right: 'w-1/3',
    },
  },
});
const cvaTitle = cva(['font-base text-lg', 'whitespace-nowrap'], {
  variants: {
    align: {
      left: 'text-sm text-left',
      right: 'text-sm text-right  ',
    },
  },
});

const TaskProgress: FC<TaskProgressProps> = ({
  task,
  status,
  completePercent,
  isShort = false,
  isDisplayingPercent,
}) => {
  const calculateCompletePercent = (
    taskStatus: typeof status,
    taskPercent: typeof completePercent
  ) => {
    if (taskStatus == 'completed') {
      return 100;
    } else {
      return taskPercent ?? 0;
    }
  };

  const taskCompletePercentStatus = calculateCompletePercent(
    status,
    completePercent
  );

  const [shortDisplay, setShortDisplay] = useState<boolean>(isShort);

  const animateTaskProgressVariants = {
    open: { width: '100%' },
    closed: { width: '100%' },
  };

  useEffect(() => {
    setShortDisplay(isShort);
  }, [isShort]);

  return (
    <motion.div
      transition={{ duration: 0.2 }}
      variants={animateTaskProgressVariants}
      animate={shortDisplay ? 'closed' : 'open'}
      className={cvaRoot({ isShort: shortDisplay, height: 'sm' })}>
      <div
        style={{ width: `${shortDisplay ? 100 : taskCompletePercentStatus}%` }}
        className={cvaProgress({ status, isShort: shortDisplay })}></div>
      {!isShort ? (
        <div className={cvaTextBlock({ status })}>
          <div className={cvaTextSection({ align: 'left' })}>
            <p className={cvaTitle({ align: 'left' })}>{task}</p>
          </div>
          <div className={cvaTextSection({ align: 'right' })}>
            <p className={cvaTitle({ align: 'right' })}>
              {isDisplayingPercent ? taskCompletePercentStatus + '%' : '100%'}
            </p>
          </div>
        </div>
      ) : null}
    </motion.div>
  );
};

export default TaskProgress;
