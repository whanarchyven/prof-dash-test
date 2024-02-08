'use client';
import { cva, VariantProps } from 'class-variance-authority';
import { FC, ReactNode, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { AnimatePresence } from 'framer-motion';
import ToolTip from '@/shared/ui/tooltip/ui';
import TimeAgo from 'timeago-react';
import { addDays } from 'date-fns';
import ru from 'timeago.js/lib/lang/ru';
import * as timeago from 'timeago.js';
timeago.register('ru', ru);
export interface StageProgressProps {
  dayRemains: number;
  children?: ReactNode;
}

interface stageProgressColor
  extends VariantProps<typeof cvaStageProgressContainer> {}

export const getStageProgressColor: (
  remain: number
) => stageProgressColor['remain'] = (remain: number) => {
  switch (true) {
    case remain > 7 && remain <= 14:
      return 'warning';
    case remain > 14 && remain <= 20:
      return 'normal';
    case remain > 20:
      return 'normal';
    default:
      return 'danger';
  }
};

const cvaStageProgressContainer = cva(
  [
    'flex items-center gap-1 justify-center',
    'relative',
    'w-fit h-fit',
    'whitespace-nowrap text-sm ',
  ],
  {
    variants: {
      remain: {
        normal: 'text-cGreen',
        warning: 'text-cOrange',
        danger: 'text-cRedAccent',
      },
    },
  }
);

const StageProgressCountdown: FC<StageProgressProps> = ({
  dayRemains,
  children,
}) => {
  const dayToSecCoef = 24 * 60 * 60;
  const stageProgressColor = getStageProgressColor(dayRemains);
  const [hovered, setHovered] = useState<boolean>(false);
  return (
    <div
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      className={cvaStageProgressContainer({ remain: stageProgressColor })}>
      {dayRemains >= 0 ? (
        <CountdownCircleTimer
          size={18}
          strokeWidth={3}
          isSmoothColorTransition={false}
          isPlaying
          duration={dayToSecCoef * 32}
          initialRemainingTime={
            dayRemains < 32 ? dayRemains * dayToSecCoef : 32 * dayToSecCoef
          }
          trailColor={'rgba(7,7,7,0.08)'}
          colors={['#01BF64', '#01BF64', '#F8AE00', '#FF5757', '#FF5757']}
          colorsTime={[
            dayToSecCoef * 32,
            dayToSecCoef * 20,
            dayToSecCoef * 14,
            dayToSecCoef * 7,
            0,
          ]}
        />
      ) : (
        <CountdownCircleTimer
          size={18}
          strokeWidth={3}
          isSmoothColorTransition={false}
          duration={1}
          trailColor={'rgba(7,7,7,0.08)'}
          colors={['#FF5757', '#FF5757']}
          colorsTime={[1, 0]}
        />
      )}
      {children ? (
        children
      ) : dayRemains >= 0 ? (
        dayRemains.toString().concat(' ', 'дней')
      ) : (
        <TimeAgo locale={'ru'} datetime={addDays(Date.now(), dayRemains)} />
      )}
      <AnimatePresence>
        {hovered && <ToolTip>До окончания этапа</ToolTip>}
      </AnimatePresence>
    </div>
  );
};

export default StageProgressCountdown;
