'use client';
import { cva } from 'class-variance-authority';
import { FC } from 'react';
import CardHeader, { CardHeaderProps } from '@/shared/ui/card-header/ui';
import TaskTimer, { TaskTimerProps } from '@/shared/ui/task-timer/ui';
import StageProgressCountdown, {
  StageProgressProps,
} from '@/shared/ui/stage-progress-countdown/ui/StageProgressCountdown';
import InvoiceProgress from '@/shared/ui/invoice-progress/ui/InvoiceProgress';

export interface CardItemProps extends CardHeaderProps {
  totalCheck: number;
  prepayment: number;
  time: TaskTimerProps;
  profit: TaskTimerProps;
  stageProgress: StageProgressProps;
}

const cvaCardItemRoot = cva(['flex flex-col gap-1', 'w-full']);
const cvaCardBodyBlock = cva([
  'grid grid-cols-2 gap-2',
  'p-1.5',
  'rounded-2xl',
  'bg-white',
]);
const cvaDatesAndPaymentsBlock = cva(['flex flex-col justify-between gap-1']);
const cvaPaymentsBlock = cva(['flex flex-col gap-0.5']);
const cvaDatesAndProgressBlock = cva(['flex items-end gap-2']);
const cvaDatesBlock = cva(['flex flex-col gap-0.1']);
const cvaTimersBlock = cva(['flex flex-col gap-0.5']);
const cvaDateTitle = cva(['text-[1.3rem] font-secondary text-cGray']);
const cvaTotalCheckTitle = cva(['text-lg']);
const cvaRemainsCheckTitle = cva([
  'text-sm font-secondary text-cGray opacity-50',
]);
const CardItem: FC<CardItemProps> = ({
  totalCheck,
  prepayment,
  time,
  profit,
  stageProgress,
  dateEnd,
  dateStart,
  customer,
  manager,
  height,
}) => {
  return (
    <div className={cvaCardItemRoot()}>
      <CardHeader
        customer={customer}
        dateStart={new Date('2023-12-17')}
        dateEnd={new Date('2024-1-17')}
        category={'development'}
        manager={manager}
      />
      <div className={cvaCardBodyBlock()}>
        <div className={cvaDatesAndPaymentsBlock()}>
          <div className={cvaPaymentsBlock()}>
            <p className={cvaTotalCheckTitle()}>
              {totalCheck.toLocaleString()} ₽
            </p>
            <InvoiceProgress status={'closed'}>
              {prepayment.toLocaleString()} ₽
            </InvoiceProgress>
            <p className={cvaRemainsCheckTitle()}>
              Остаток {(totalCheck - prepayment).toLocaleString()} ₽
            </p>
          </div>
          <div className={cvaDatesAndProgressBlock()}>
            <div className={cvaDatesBlock()}>
              <p className={cvaDateTitle()}>
                {dateStart.toLocaleDateString('default', {
                  month: 'short',
                  day: '2-digit',
                  year: 'numeric',
                })}
              </p>
              <p className={cvaDateTitle()}>
                {dateEnd.toLocaleDateString('default', {
                  month: 'short',
                  day: '2-digit',
                  year: 'numeric',
                })}
              </p>
            </div>
            <StageProgressCountdown dayRemains={stageProgress.dayRemains}>
              {stageProgress.children}
            </StageProgressCountdown>
          </div>
        </div>
        <div className={cvaTimersBlock()}>
          <TaskTimer height={height} {...time}></TaskTimer>
          <TaskTimer height={height} {...profit}></TaskTimer>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
