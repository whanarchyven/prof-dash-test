'use client';
import { cva, VariantProps } from 'class-variance-authority';
import { FC, useEffect, useState } from 'react';

export interface TaskTimerProps
  extends VariantProps<typeof cvaProgress>,
    VariantProps<typeof cvaRoot> {
  category: 'time' | 'profit';
  fact: number;
  plan: number;
}

const cvaRoot = cva(
  [
    'rounded-3xl p-1.2 relative cursor-pointer bg-cBlack bg-opacity-[0.03] overflow-hidden',
  ],
  {
    variants: {
      height: {
        xl: ['h-10'],
        lg: ['h-8'],
        md: ['h-6'],
        sm: ['h-4'],
        xs: ['h-2'],
      },
      isShort: {
        true: 'w-1.2 rounded-xl',
        false: 'w-full rounded-3xl',
      },
    },
  }
);
const cvaProgress = cva(['absolute z-[-1] left-0 top-0 rounded-3xl h-full'], {
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
const cvaTextBlock = cva(['flex w-full justify-between items-end'], {
  variants: {
    status: {
      default: ['text-cGray'],
      completed: ['text-cWhite'],
      failed: ['text-cWhite'],
      pending: ['text-cGray'],
    },
  },
});
const cvaTextSection = cva(['flex flex-col gap-0.3']);
const cvaTitle = cva(['font-base text-lg'], {
  variants: {
    align: {
      left: 'text-lg',
      right: 'text-base',
    },
  },
});
const cvaDescription = cva(['text-sm font-secondary opacity-50']);

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
  const [shortDisplay, setShortDisplay] = useState(isShort);

  useEffect(() => {
    setShortDisplay(isShort);
  }, [isShort]);

  const isCategoryTime = category == 'time';

  const taskProgress = calculateProgressPercent(status, shortDisplay ?? false);

  return (
    <div
      //     onMouseEnter={() => {
      //     isShort ? setShortDisplay(false) : null;
      // }}
      //      onMouseLeave={() => {
      //          isShort ? setShortDisplay(true) : null;
      //      }}
      className={cvaRoot({ isShort: shortDisplay, height: height })}>
      <div
        style={{
          width: `${shortDisplay && status == 'default' ? 0 : taskProgress}%`,
        }}
        className={cvaProgress({ status, isShort: shortDisplay })}></div>
      {!shortDisplay && (
        <div className={cvaTextBlock({ status })}>
          <div className={cvaTextSection()}>
            <p className={cvaTitle({ align: 'left' })}>
              {fact}
              {isCategoryTime ? ' ч' : '%'}
            </p>
            <p className={cvaDescription()}>
              {isCategoryTime ? 'всего' : 'факт'}
            </p>
          </div>
          <div className={cvaTextSection()}>
            <p className={cvaTitle({ align: 'right' })}>
              {plan}
              {isCategoryTime ? ' ч' : '%'}
            </p>
            <p className={cvaDescription()}>
              {isCategoryTime ? 'оценка' : 'план'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskTimer;
