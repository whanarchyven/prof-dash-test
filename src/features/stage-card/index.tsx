'use client';
import { cva } from 'class-variance-authority';
import { FC, useEffect, useRef, useState } from 'react';
import CardItem, { CardItemProps } from '@/entities/card-item/ui';
import TimeLine, { TimeLineProps } from '@/features/timeline';
import { useAppDispatch } from '@/shared/store/hooks/useAppDispatch';
import {
  setContainerWidth,
  setAreaWidth,
  setCardWidth,
  containerParametersSelectors,
} from '@/shared/store/containerWidthSlice';
import { useAppSelector } from '@/shared/store/hooks/useAppSelector';
import StageNotification from '@/shared/ui/stage-notification/ui';
import InvoiceProgress from '@/shared/ui/invoice-progress/ui/InvoiceProgress';
import { timelineSelectors } from '@/shared/store/timelineSlice';
import {
  calculateStageMarginLeft,
  calculateStageWidth,
} from '@/features/timeline/utils/calculateStageParameters';
import { AnimatePresence } from 'framer-motion';

export interface StageCardInterface {
  task: CardItemProps;
  stages: TimeLineProps['stages'];
  startPeriod: Date;
  endPeriod: Date;
}

const cvaStageCardRoot = cva(['grid grid-cols-12 gap-1', 'w-full', 'relative']);
const cvaStageTaskCard = cva(['col-span-4 relative']);
const cvaStageTimelineBlock = cva([
  'col-span-8',
  'overflow-x-clip',
  'rounded-2xl',
  'relative',
]);
const cvaStageTimelineNotifications = cva([
  'absolute z-50 overflow-visible left-2 top-2',
  'flex flex-col gap-1 flex-wrap',
  'max-h-full',
]);

const StageCard: FC<StageCardInterface> = ({
  task,
  stages,
  startPeriod,
  endPeriod,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const containerParameters = useAppSelector(
    containerParametersSelectors.containerParameters
  );

  const currentScroll = useAppSelector(timelineSelectors.timeLineScroll);

  useEffect(() => {
    if (containerRef.current && containerParameters.container == 0) {
      dispatch(setContainerWidth(containerRef.current.offsetWidth));
    }
    if (areaRef.current && containerParameters.area == 0) {
      dispatch(setAreaWidth(areaRef.current.offsetWidth));
    }
    if (cardRef.current && containerParameters.card == 0) {
      dispatch(setCardWidth(cardRef.current.offsetWidth));
    }
  }, [containerRef]);

  const initialStageNotifications: () => Array<{
    stage: (typeof stages)[0];
    coordinate: number;
    isDisplay: boolean;
    type: 'task' | 'invoice';
  }> = () => {
    const temp: typeof stagesNotifications = [];
    stages.map((stage) => {
      if (stage.stageInfo.payment.status != 'closed') {
        temp.push({
          stage: stage,
          coordinate: calculateStageMarginLeft(startPeriod, stage.dateEnd),
          isDisplay: false,
          type: 'invoice',
        });
      }
      if (stage.stageInfo.taskProgressStatus == 'pending') {
        temp.push({
          stage: stage,
          coordinate: calculateStageMarginLeft(startPeriod, stage.dateEnd),
          isDisplay: false,
          type: 'task',
        });
      }
    });
    return temp;
  };

  const [stagesNotifications, setStagesNotifications] = useState<
    {
      stage: (typeof stages)[0];
      coordinate: number;
      isDisplay: boolean;
      type: 'task' | 'invoice';
    }[]
  >(initialStageNotifications());

  useEffect(() => {
    if (stagesNotifications) {
      const temp = [...stagesNotifications];
      temp.map((stage) => {
        if (currentScroll > stage.coordinate) {
          stage.isDisplay = true;
        } else {
          stage.isDisplay = false;
        }
      });
      setStagesNotifications([...temp]);
    }
  }, [currentScroll]);

  const calculateStageNotificationScroll = (
    notification: (typeof stagesNotifications)[0]
  ) => {
    return (
      notification.coordinate -
      calculateStageWidth(
        notification.stage.dateStart,
        notification.stage.dateEnd
      ) -
      containerParameters.card
    );
  };

  return (
    <div ref={containerRef} className={cvaStageCardRoot()}>
      <div ref={cardRef} className={cvaStageTaskCard()}>
        <CardItem {...task} />
      </div>
      <div ref={areaRef} className={cvaStageTimelineBlock()}>
        <div className={cvaStageTimelineNotifications()}>
          <AnimatePresence>
            {stagesNotifications.map((notification, counter) => {
              if (notification.isDisplay && notification.type == 'invoice') {
                const scrollTo = calculateStageNotificationScroll(notification);
                return (
                  <StageNotification
                    key={'invoice' + counter}
                    scrollTo={scrollTo}>
                    <InvoiceProgress
                      amount={notification.stage.stageInfo.payment.amount}
                      status={notification.stage.stageInfo.payment.status}
                    />
                  </StageNotification>
                );
              }
            })}
          </AnimatePresence>
          <AnimatePresence>
            {stagesNotifications.map((notification, counter) => {
              if (notification.isDisplay && notification.type == 'task') {
                const scrollTo =
                  notification.coordinate -
                  calculateStageWidth(
                    notification.stage.dateStart,
                    notification.stage.dateEnd
                  ) -
                  containerParameters.card;
                return (
                  <StageNotification key={'task' + counter} scrollTo={scrollTo}>
                    {notification.stage.stageInfo.task}
                  </StageNotification>
                );
              }
            })}
          </AnimatePresence>
        </div>
        <TimeLine
          startPeriod={startPeriod}
          endPeriod={endPeriod}
          stages={stages}
          maxWidth={containerParameters.container}
        />
      </div>
    </div>
  );
};

export default StageCard;
