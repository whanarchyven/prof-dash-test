import { cva, VariantProps } from 'class-variance-authority';
import { FC } from 'react';

interface Props extends VariantProps<typeof cvaProgress> {
  category: 'time' | 'profit';
  fact: number;
  plan: number;
}

const cvaRoot = cva(
  ['rounded-3xl p-1.2 relative bg-cBlack bg-opacity-[0.03] overflow-hidden'],
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
      default: ['bg-cGrayLight'],
      completed: ['bg-cGreen w-full'],
      failed: ['bg-cRed w-full'],
    },
  },
});
const cvaTextBlock = cva(['flex w-full justify-between items-end'], {
  variants: {
    status: {
      default: ['text-cGray'],
      completed: ['text-cWhite'],
      failed: ['text-cWhite'],
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

const TaskTimer: FC<Props> = ({ category, status, fact, plan }) => {
  const calculateProgressPercent = (taskStatus: typeof status) => {
    switch (taskStatus) {
      case 'default':
        return (fact / plan) * 100;
      default:
        return 100;
    }
  };

  const isCategoryTime = category == 'time';

  const taskProgress = calculateProgressPercent(status);

  return (
    <div className={cvaRoot()}>
      <div
        style={{ width: `${taskProgress}%` }}
        className={cvaProgress({ status })}></div>
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
    </div>
  );
};

export default TaskTimer;
