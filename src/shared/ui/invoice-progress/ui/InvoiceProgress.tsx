'use client';
import { cva, VariantProps } from 'class-variance-authority';
import { FC, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import CompletedIcon from '/public/icons/complete.svg';
import { formatPrice } from '@/shared/utils/formatters';
import { AnimatePresence } from 'framer-motion';
import ToolTip from '@/shared/ui/tooltip/ui';

export interface InvoiceProgressProps
  extends VariantProps<typeof cvaStageProgressContainer> {
  amount: number;
}

const cvaStageProgressContainer = cva(
  [
    'flex items-center justify-center gap-1',
    'relative',
    'w-fit',
    'whitespace-nowrap text-sm',
  ],
  {
    variants: {
      status: {
        planning: 'text-cBlack text-opacity-30',
        setting: 'text-cBlack text-opacity-30',
        ready: 'text-cBlack text-opacity-30',
        sended: 'text-cBlack text-opacity-30',
        closed: 'text-cGreen',
        transit: 'text-cGreen',
      },
    },
  }
);

const cvaTransitPostfix = cva(['text-cOrange']);

const InvoiceProgress: FC<InvoiceProgressProps> = ({ status, amount }) => {
  const translateInvoiceProgressByStatus = (invoiceStatus: typeof status) => {
    const statusMap: Map<
      typeof invoiceStatus,
      { progress: number; title: string }
    > = new Map();
    statusMap.set('planning', { progress: 0, title: 'Планируется' });
    statusMap.set('setting', { progress: 35, title: 'Выставить' });
    statusMap.set('ready', { progress: 65, title: 'Подготовлен' });
    statusMap.set('sended', { progress: 100, title: 'Отправлен' });
    return statusMap.get(status);
  };

  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <div
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      className={cvaStageProgressContainer({ status: status })}>
      <AnimatePresence>
        {hovered && (
          <ToolTip>
            {status == 'closed' || status == 'transit'
              ? 'Закрыт'
              : translateInvoiceProgressByStatus(status)?.title}
          </ToolTip>
        )}
      </AnimatePresence>
      {status == 'closed' || status == 'transit' ? (
        <CompletedIcon />
      ) : (
        <div style={{ transform: 'scale(-1,1)' }}>
          <CountdownCircleTimer
            size={18}
            strokeWidth={3}
            isSmoothColorTransition={false}
            duration={100}
            initialRemainingTime={
              translateInvoiceProgressByStatus(status)?.progress
            }
            trailColor={'rgba(7,7,7,0.08)'}
            colors={['#2555FF', '#F8AE00', '#FF5757']}
            colorsTime={[100, 66, 36, 0]}
          />
        </div>
      )}
      {formatPrice(amount)}
      {status == 'transit' ? (
        <p className={cvaTransitPostfix()}>транзит</p>
      ) : null}
    </div>
  );
};

export default InvoiceProgress;
