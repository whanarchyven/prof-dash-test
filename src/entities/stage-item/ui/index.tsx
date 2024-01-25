'use client';
import { cva } from 'class-variance-authority';
import { FC, useState } from 'react';
import TaskTimer, { TaskTimerProps } from '@/shared/ui/task-timer/ui';
import TaskProgress, { TaskProgressProps } from '@/shared/ui/task-progress/ui';
import InvoiceProgress, {
  InvoiceProgressProps,
} from '@/shared/ui/invoice-progress/ui/InvoiceProgress';

export interface StageItemProps extends TaskTimerProps {
  taskProgressStatus: TaskProgressProps['status'];
  taskProgressCompletePercent: TaskProgressProps['completePercent'];
  prepayment?: InvoiceProgressProps;
  payment: InvoiceProgressProps;
}

const cvaRoot = cva(['flex w-full flex-col gap-0.4'], { variants: {} });
const cvaInvoiceBlock = cva(['flex justify-between gap-2']);
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
          <InvoiceProgress {...prepayment}>
            {prepayment.children && prepayment.children.toLocaleString()} ₽
          </InvoiceProgress>
        ) : (
          <div></div>
        )}
        <InvoiceProgress {...payment}>
          {payment.children && payment.children.toLocaleString()} ₽
        </InvoiceProgress>
      </div>
    </div>
  );
};

export default StageItem;
