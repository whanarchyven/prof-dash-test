'use client';
import { cva } from 'class-variance-authority';
import { FC, useState } from 'react';
import TaskTimer, { TaskTimerProps } from '@/shared/ui/task-timer/ui';
import TaskProgress, { TaskProgressProps } from '@/shared/ui/task-progress/ui';
import InvoiceProgress, {
  InvoiceProgressProps,
} from '@/shared/ui/invoice-progress/ui/InvoiceProgress';
import { formatPrice } from '@/shared/utils/formatters';

export interface StageItemProps extends TaskTimerProps {
  taskProgressStatus: TaskProgressProps['status'];
  taskProgressCompletePercent: TaskProgressProps['completePercent'];
  task: TaskProgressProps['task'];
  prepayment?: InvoiceProgressProps;
  payment: InvoiceProgressProps;
}

const cvaRoot = cva(['flex w-full relative flex-col gap-0.4'], {
  variants: {},
});
const cvaInvoiceBlock = cva(['flex justify-between gap-2']);
const cvaFullDescBlock = cva([
  'min-w-[300px] w-fit',
  'absolute top-0 left-[15%] z-50',
  'border-l-4 border-white',
]);
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
  const [isShortDisplay, setIsShortDisplay] = useState(false);
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
      )}
      {isShortDisplay && (
        <div className={cvaFullDescBlock()}>
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
              {prepayment ? (
                <InvoiceProgress {...prepayment}>
                  {prepayment.children &&
                    formatPrice(Number(prepayment.children))}
                </InvoiceProgress>
              ) : (
                <div></div>
              )}
              <InvoiceProgress {...payment}>
                {payment.children && formatPrice(Number(payment.children))}
              </InvoiceProgress>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StageItem;
