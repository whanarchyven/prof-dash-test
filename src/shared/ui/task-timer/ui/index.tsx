'use client';
import { cva, VariantProps } from 'class-variance-authority';
import { FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { formatPrice } from '@/shared/utils/formatters';

export interface TaskTimerProps
  extends VariantProps<typeof cvaProgress>,
    VariantProps<typeof cvaRoot> {
  category: 'time' | 'profit' | 'money';
  fact: number;
  plan: number;
}

const cvaRoot = cva(
  [
    'rounded-3xl relative cursor-pointer  bg-cBlack bg-opacity-[0.03] overflow-hidden',
  ],
  {
    variants: {
      height: {
        xl: ['h-10 p-1.4'],
        lg: ['h-6 p-1.2'],
        md: ['h-5.5 px-1 py-0.6'],
        sm: ['h-4 p-0.8'],
        xs: ['h-2 p-0.6'],
      },
      isShort: {
        true: 'w-full rounded-3xl',
        false: 'w-full rounded-3xl',
      },
    },
  }
);
const cvaProgress = cva(['absolute z-[1] left-0 top-0 rounded-3xl h-full'], {
  variants: {
    status: {
      default: ['bg-cGrayLight'],
      completed: ['bg-cGreen w-full'],
      failed: ['bg-cRed w-full'],
      pending: ['bg-cYellow'],
    },
    isShort: {
      true: 'rounded-xl',
      false: 'rounded-3xl',
    },
  },
});
const cvaTextBlock = cva(
  ['flex w-full relative z-[2] justify-between items-end'],
  {
    variants: {
      status: {
        default: ['text-cGray'],
        completed: ['text-cWhite'],
        failed: ['text-cWhite'],
        pending: ['text-cGray'],
      },
    },
  }
);
const cvaTextSection = cva(['flex flex-col gap-0.1']);
const cvaTitle = cva(['font-base text-lg', 'whitespace-nowrap'], {
  variants: {
    height: {
      xl: 'text-xl',
      lg: 'text-lg',
      md: 'text-md',
      sm: 'text-sm',
      xs: 'text-xs',
    },
    align: {
      left: 'scale-102',
      right: 'scale-100',
    },
  },
  defaultVariants: {
    height: 'lg',
  },
});
const cvaDescription = cva(['font-secondary opacity-50'], {
  variants: {
    height: {
      xl: 'text-base',
      lg: 'text-sm',
      md: 'text-sm',
      sm: 'text-sm',
      xs: 'text-sm',
    },
  },
  defaultVariants: {
    height: 'lg',
  },
});

const TaskTimer: FC<TaskTimerProps> = ({
  category,
  status,
  fact,
  plan,
  isShort,
  height,
}) => {
  const calculateProgressPercent = (
    taskStatus: typeof status,
    isShort?: boolean
  ) => {
    switch (taskStatus) {
      case 'default':
        return (fact / plan) * 100;
      case 'pending':
        if (isShort) {
          return 100;
        } else {
          return (fact / plan) * 100;
        }
      default:
        return 100;
    }
  };
  const [shortDisplay, setShortDisplay] = useState<typeof isShort>(isShort);

  useEffect(() => {
    setShortDisplay(isShort);
  }, [isShort]);

  const isCategoryTime = category == 'time';
  const isCategoryMoney = category == 'money';

  const taskProgress = calculateProgressPercent(status, shortDisplay ?? false);

  return (
    <motion.div
      transition={{ duration: 0.2 }}
      className={cvaRoot({ isShort: isShort, height: height })}>
      <div
        style={{
          width: `${shortDisplay && status == 'default' ? 0 : taskProgress}%`,
        }}
        className={cvaProgress({ status, isShort: shortDisplay })}></div>
      {!isShort && (
        <div className={cvaTextBlock({ status })}>
          <div className={cvaTextSection()}>
            <p className={cvaTitle({ align: 'left' })}>
              {isCategoryMoney ? (
                <>{formatPrice(fact)}</>
              ) : (
                <>
                  {fact}
                  {isCategoryTime ? ' ч' : '%'}
                </>
              )}
            </p>
            <p className={cvaDescription({ height: height })}>
              {isCategoryTime ? 'всего' : 'факт'}
            </p>
          </div>
          <div className={cvaTextSection()}>
            <p className={cvaTitle({ align: 'right', height: height })}>
              {isCategoryMoney ? (
                <>{formatPrice(plan)}</>
              ) : (
                <>
                  {plan}
                  {isCategoryTime ? ' ч' : '%'}
                </>
              )}
            </p>
            <p className={cvaDescription({ height: height })}>
              {isCategoryTime ? 'оценка' : 'план'}
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TaskTimer;
