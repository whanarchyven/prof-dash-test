'use client';
import { cva } from 'class-variance-authority';
import { FC, useState } from 'react';
import TaskTimer, { TaskTimerProps } from '@/shared/ui/task-timer/ui';
import TaskProgress, { TaskProgressProps } from '@/shared/ui/task-progress/ui';
import InvoiceProgress, {
  InvoiceProgressProps,
} from '@/shared/ui/invoice-progress/ui/InvoiceProgress';

interface Props extends TaskTimerProps {
  taskProgressStatus: TaskProgressProps['status'];
  taskProgressCompletePercent: TaskProgressProps['completePercent'];
  prepayment?: InvoiceProgressProps;
  payment: InvoiceProgressProps;
}

const cvaRoot = cva(['flex flex-col gap-1'], { variants: {} });
const cvaInvoiceBlock = cva(['flex justify-between gap-2']);
const StageItem: FC<Props> = ({
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
}) => {
  const [isShortDisplay, setIsShortDisplay] = useState(isShort ?? false);

  return (
    <div
      onMouseEnter={() => {
        isShort ? setIsShortDisplay(false) : null;
      }}
      onMouseLeave={() => {
        isShort ? setIsShortDisplay(true) : null;
      }}
      className={cvaRoot({})}>
      <TaskTimer
        isShort={isShortDisplay}
        category={category}
        fact={fact}
        status={status}
        plan={plan}
        height={height}
      />
      <TaskProgress
        isShort={isShortDisplay}
        task={'Сверстать дашборд'}
        completePercent={taskProgressCompletePercent}
        status={taskProgressStatus}></TaskProgress>
      <div className={cvaInvoiceBlock()}>
        {prepayment ? (
          <InvoiceProgress {...prepayment}>220 000 ₽</InvoiceProgress>
        ) : (
          <div></div>
        )}
        <InvoiceProgress {...payment}>220 000 ₽</InvoiceProgress>
      </div>
    </div>
  );
};

export default StageItem;
