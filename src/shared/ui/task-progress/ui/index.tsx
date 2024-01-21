import { cva, VariantProps } from 'class-variance-authority';
import { FC } from 'react';

interface Props extends VariantProps<typeof cvaProgress> {
  task: string;
  completePercent?: number;
}

const cvaRoot = cva(
  [
    'rounded-3xl p-1.2 relative bg-cBlack w-full bg-opacity-[0.03] overflow-hidden',
  ],
  {
    variants: {
      height: {
        sm: ['h-10'],
      },
    },
  }
);
const cvaProgress = cva(['absolute z-[-1] left-0 top-0 rounded-3xl h-full'], {
  variants: {
    status: {
      completed: ['bg-cGreen w-full'],
      pending: ['bg-cYellow w-full'],
    },
  },
});
const cvaTextBlock = cva(['flex w-full justify-between gap-1 items-end'], {
  variants: {
    status: {
      completed: ['text-cWhite'],
      pending: ['text-cGray'],
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

const TaskProgress: FC<Props> = ({ task, status, completePercent }) => {
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

  return (
    <div className={cvaRoot()}>
      <div
        style={{ width: `${taskCompletePercentStatus}%` }}
        className={cvaProgress({ status })}></div>
      <div className={cvaTextBlock({ status })}>
        <div className={cvaTextSection({ align: 'left' })}>
          <p className={cvaTitle({ align: 'left' })}>{task}</p>
        </div>
        <div className={cvaTextSection({ align: 'right' })}>
          <p className={cvaTitle({ align: 'right' })}>100%</p>
        </div>
      </div>
    </div>
  );
};

export default TaskProgress;
