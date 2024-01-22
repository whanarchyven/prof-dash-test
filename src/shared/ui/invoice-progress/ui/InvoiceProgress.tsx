'use client';
import { cva, VariantProps } from 'class-variance-authority';
import { FC, ReactNode } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import CompletedIcon from '/public/icons/complete.svg';

export interface InvoiceProgressProps
  extends VariantProps<typeof cvaStageProgressContainer> {
  children: ReactNode;
}

const cvaStageProgressContainer = cva(
  ['flex items-center w-fit whitespace-nowrap text-sm gap-1'],
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
const InvoiceProgress: FC<InvoiceProgressProps> = ({ status, children }) => {
  const translateInvoiceProgressByStatus = (invoiceStatus: typeof status) => {
    const statusMap: Map<typeof invoiceStatus, number> = new Map();
    statusMap.set('planning', 0);
    statusMap.set('setting', 35);
    statusMap.set('ready', 65);
    statusMap.set('sended', 100);

    return statusMap.get(status);
  };

  return (
    <div className={cvaStageProgressContainer({ status: status })}>
      {status == 'closed' || status == 'transit' ? (
        <CompletedIcon />
      ) : (
        <div style={{ transform: 'scale(-1,1)' }}>
          <CountdownCircleTimer
            size={24}
            strokeWidth={4}
            isSmoothColorTransition={false}
            duration={100}
            initialRemainingTime={translateInvoiceProgressByStatus(status)}
            trailColor={'rgba(7,7,7,0.08)'}
            colors={['#2555FF', '#F8AE00', '#FF5757']}
            colorsTime={[100, 66, 36, 0]}
          />
        </div>
      )}
      {children}
      {status == 'transit' ? (
        <p className={cvaTransitPostfix()}>транзит</p>
      ) : null}
    </div>
  );
};

export default InvoiceProgress;
