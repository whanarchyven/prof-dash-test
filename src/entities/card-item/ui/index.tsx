'use client';
import { cva } from 'class-variance-authority';
import { FC } from 'react';
import CardHeader, { CardHeaderProps } from '@/shared/ui/card-header/ui';
import TaskTimer, { TaskTimerProps } from '@/shared/ui/task-timer/ui';
import StageProgressCountdown, {
  StageProgressProps,
} from '@/shared/ui/stage-progress-countdown/ui/StageProgressCountdown';
import InvoiceProgress from '@/shared/ui/invoice-progress/ui/InvoiceProgress';
import { formatPrice } from '@/shared/utils/formatters';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export interface CardItemProps extends CardHeaderProps {
  totalCheck?: number | null;
  prepayment: number;
  paymentRemains?: number;
  time: { plan: number; fact: number; status: TaskTimerProps['status'] };
  profit?: number | null;
  stageProgress?: StageProgressProps | null;
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
  'text-sm font-secondary text-cGray ',
  'opacity-50',
]);

const CardItem: FC<CardItemProps> = ({
  totalCheck,
  isPined,
  prepayment,
  paymentRemains,
  time,
  profit,
  stageProgress,
  dateEnd,
  dateStart,
  categories,
  customer,
  projectUrl,
  listName,
  manager,
  height,
}) => {
  return (
    <div className={cvaCardItemRoot()}>
      <CardHeader
        customer={customer}
        projectUrl={projectUrl}
        isPined={isPined}
        listName={listName}
        dateStart={dateStart}
        dateEnd={dateEnd}
        categories={categories}
        manager={manager}
      />
      <div className={cvaCardBodyBlock()}>
        <div className={cvaDatesAndPaymentsBlock()}>
          <div className={cvaPaymentsBlock()}>
            <p className={cvaTotalCheckTitle()}>
              {totalCheck ? `${totalCheck.toLocaleString()} ₽` : 'Не задан'}
            </p>
            <InvoiceProgress status={'closed'} amount={prepayment} />
            <p className={cvaRemainsCheckTitle()}>
              Остаток{' '}
              {paymentRemains ? formatPrice(paymentRemains) : 'не задан'}
            </p>
          </div>
          <div className={cvaDatesAndProgressBlock()}>
            <div className={cvaDatesBlock()}>
              <p className={cvaDateTitle()}>
                {dateStart
                  ? format(dateStart, 'dd MMM yyyy г.', { locale: ru })
                  : 'не задано'}
              </p>
              <p className={cvaDateTitle()}>
                {dateEnd
                  ? format(dateEnd, 'dd MMM yyyy г.', { locale: ru })
                  : 'не задано'}{' '}
              </p>
            </div>
            {stageProgress && (
              <StageProgressCountdown dayRemains={stageProgress.dayRemains}>
                {stageProgress.children}
              </StageProgressCountdown>
            )}
          </div>
        </div>
        <div className={cvaTimersBlock()}>
          <TaskTimer
            height={height}
            category={'time'}
            fact={time.fact}
            status={time.status}
            plan={time.plan}></TaskTimer>
          <TaskTimer
            height={height}
            category={'profit'}
            status={profit ? (profit < 20 ? 'failed' : 'done') : 'default'}
            plan={null}
            fact={profit ?? null}></TaskTimer>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
