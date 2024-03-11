'use client';
import { cva } from 'class-variance-authority';
import { FC, useEffect, useRef, useState } from 'react';
import CardItem from '@/entities/card-item/ui';
import TimeLine from '@/features/timeline';
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
import { IStage } from '@/features/stage-card/types/IStage';
import { isFirstUnfinishedProjectType } from '@/shared/utils/isFirstUnfinishedProjectType';
import { IProject } from '@/features/stage-card/types/IProject';
import { differenceInDays } from 'date-fns';
import { formatDuration } from '@/shared/utils/formatters';

export interface StageCardInterface {
  project: IProject;
  stages: IStage[];
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
  project,
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
      if (stage.end == undefined || stage.start == undefined) return null;
      const dateEnd = new Date(stage.end);
      if (stage.invoice && stage.invoice?.status != 'closed') {
        temp.push({
          stage: stage,
          coordinate: calculateStageMarginLeft(startPeriod, dateEnd),
          isDisplay: false,
          type: 'invoice',
        });
      }
      if (stage.status == 'in-progress') {
        temp.push({
          stage: stage,
          coordinate: calculateStageMarginLeft(startPeriod, dateEnd),
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
        new Date(String(notification.stage.start)),
        new Date(String(notification.stage.end))
      ) -
      containerParameters.card
    );
  };

  const calculateAvance = () => {
    let totalAvance = 0;
    let totalRemain = 0;
    if (isFirstUnfinishedProjectType(project.types)) {
      const firstNotFinished = stages.find((item) => item.status != 'done');
      if (
        firstNotFinished?.invoice?.status == 'отправлен' ||
        firstNotFinished?.invoice?.status == 'закрыт'
      ) {
        totalAvance += firstNotFinished?.invoice.amount;
      } else {
        totalRemain += firstNotFinished?.invoice?.amount ?? 0;
      }
    } else {
      stages.map((stage) => {
        if (
          stage?.invoice?.status == 'отправлен' ||
          stage?.invoice?.status == 'закрыт'
        ) {
          totalAvance += stage.invoice.amount;
        } else {
          totalRemain += stage?.invoice?.amount ?? 0;
        }
      });
    }
    return [totalAvance, totalRemain];
  };

  const calculateTaskTimerParameters = () => {
    if (isFirstUnfinishedProjectType(project.types)) {
      const firstNotFinished = stages.find((item) => item.status != 'done');
      const fact = firstNotFinished?.timeSpent
        ? formatDuration(firstNotFinished?.timeSpent)
        : 0;
      const plan = firstNotFinished?.estimate
        ? formatDuration(firstNotFinished?.estimate)
        : 0;
      let doneTasks = 0;
      stages.map((stage) => {
        if (stage.status == 'done' || stage.status == 'закрыта') doneTasks++;
      });
      const status =
        doneTasks == stages.length
          ? 'done'
          : fact > plan
            ? 'failed'
            : 'in-progress';

      return { fact: fact, plan: plan, status: status };
    } else {
      const fact = project.timeSpent ? formatDuration(project.timeSpent) : 0;
      const plan = project.estimate ? formatDuration(project.estimate) : 0;

      let doneTasks = 0;
      stages.map((stage) => {
        if (stage.status == 'done' || stage.status == 'закрыта') doneTasks++;
      });
      const status =
        doneTasks == stages.length
          ? 'done'
          : fact > plan
            ? 'failed'
            : 'in-progress';

      return { fact: fact, plan: plan, status: status };
    }
  };

  const calculateDateInterval = () => {
    if (isFirstUnfinishedProjectType(project.types)) {
      const firstNotFinished = stages.find((item) => item.status != 'done');
      return {
        start: firstNotFinished?.start
          ? new Date(firstNotFinished?.start)
          : null,
        end: firstNotFinished?.end ? new Date(firstNotFinished?.end) : null,
      };
    } else {
      return {
        start: project?.start ? new Date(project?.start) : null,
        end: project?.end ? new Date(project?.end) : null,
      };
    }
  };

  const calculateDayRemains = () => {
    const firstNotFinished = stages.find((item) => item.status != 'done');
    if (firstNotFinished?.end) {
      return {
        dayRemains: differenceInDays(
          new Date(firstNotFinished.end),
          new Date()
        ),
      };
    } else {
      return null;
    }
  };

  const calculateProfitability = () => {
    const profits: number[] = [];
    stages.map((stage) => {
      if (stage.status == 'done' || stage.status == 'закрыта') {
        let stageInvoiceAmount = 0;
        if (stage.invoice) {
          stageInvoiceAmount += stage.invoice.amount;
        }
        if (stageInvoiceAmount != 0) {
          const profit =
            ((stageInvoiceAmount - (stage.moneySpent ?? 0)) /
              stageInvoiceAmount) *
            100;
          profits.push(profit);
        }
      }
    });

    if (profits.length == 0) {
      return null;
    }
    let profitsSumm = 0;
    profits.map((profit) => {
      profitsSumm += profit;
    });
    return Number((profitsSumm / profits.length).toFixed(2));
  };

  return (
    <div ref={containerRef} className={cvaStageCardRoot()}>
      <div ref={cardRef} className={cvaStageTaskCard()}>
        <CardItem
          totalCheck={project.budget}
          time={calculateTaskTimerParameters()}
          profit={calculateProfitability()}
          stageProgress={calculateDayRemains()}
          dateEnd={calculateDateInterval().end}
          dateStart={calculateDateInterval().start}
          categories={project.types}
          customer={project.customer}
          projectUrl={project.url}
          listName={project.name}
          manager={project.responsible}
          height={'lg'}
          prepayment={calculateAvance()[0]}
          paymentRemains={calculateAvance()[1]}
        />
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
                    {notification.stage.invoice && (
                      <InvoiceProgress
                        amount={notification.stage.invoice?.amount}
                        status={notification.stage.invoice?.status}
                      />
                    )}
                  </StageNotification>
                );
              }
            })}
          </AnimatePresence>
          <AnimatePresence>
            {stagesNotifications.map((notification, counter) => {
              if (
                notification.stage.end == undefined ||
                notification.stage.start == undefined
              )
                return null;
              const dateStart = new Date(notification.stage.start);
              const dateEnd = new Date(notification.stage.end);
              if (notification.isDisplay && notification.type == 'task') {
                const scrollTo =
                  notification.coordinate -
                  calculateStageWidth(dateStart, dateEnd) -
                  containerParameters.card;
                return (
                  <StageNotification key={'task' + counter} scrollTo={scrollTo}>
                    {notification.stage.name}
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
