'use client';
import { cva, VariantProps } from 'class-variance-authority';
import { FC, useState } from 'react';

interface Props extends VariantProps<typeof cvaProgress> {
  task: string;
  completePercent?: number;
  isShort?: boolean;
}

const cvaRoot = cva(
  ['p-1.2 relative bg-cBlack w-full bg-opacity-[0.03] overflow-hidden'],
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
const cvaTitle = cva(['font-base text-lg'], {
  variants: {
    align: {
      left: 'text-sm truncate text-left',
      right: 'text-sm text-right  ',
    },
  },
});

const TaskProgress: FC<Props> = ({
  task,
  status,
  completePercent,
  isShort = false,
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

  const [shortDisplay, setShortDisplay] = useState(isShort);

  return (
    <div
      onMouseEnter={() => {
        isShort ? setShortDisplay(false) : null;
      }}
      onMouseLeave={() => {
        isShort ? setShortDisplay(true) : null;
      }}
      className={cvaRoot({ isShort: shortDisplay, height: 'sm' })}>
      <div
        style={{ width: `${shortDisplay ? 100 : taskCompletePercentStatus}%` }}
        className={cvaProgress({ status, isShort: shortDisplay })}></div>
      {!shortDisplay ? (
        <div className={cvaTextBlock({ status })}>
          <div className={cvaTextSection({ align: 'left' })}>
            <p className={cvaTitle({ align: 'left' })}>{task}</p>
          </div>
          <div className={cvaTextSection({ align: 'right' })}>
            <p className={cvaTitle({ align: 'right' })}>100%</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TaskProgress;
