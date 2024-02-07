'use client';
import { cva } from 'class-variance-authority';
import { FC, useEffect, useRef, useState } from 'react';
import Button from '@/shared/ui/button/ui';
import { AnimatePresence, motion } from 'framer-motion';
import TaskTimer from '@/shared/ui/task-timer/ui';
import TaskProgress from '@/shared/ui/task-progress/ui';
import { formatPrice } from '@/shared/utils/formatters';
import { useAppSelector } from '@/shared/store/hooks/useAppSelector';
import { timelineSelectors } from '@/shared/store/timelineSlice';
import { calculateDaysQnt } from '@/features/timeline/utils/calculateDaysQnt';
import { isFirstDayOfMonth, format } from 'date-fns';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { ru } from 'date-fns/locale';
import 'swiper/css';
import { containerParametersSelectors } from '@/shared/store/containerWidthSlice';

export interface SummaryPopInterface {
  startPeriod: Date;
  endPeriod: Date;
  summary: {
    monthId: number;
    goal: number;
    goalPercent: number;
    fact: number;
    plan: number;
  }[];
}

const cvaSummaryPopRoot = cva([
  'flex flex-col items-end gap-1 justify-end',
  'relative',
]);
const cvaSummaryPopBtn = cva([
  'bg-white',
  'text-cBlue text-sm',
  'p-1',
  'rounded-full',
  'shadow-xl',
]);
const cvaSummaryPop = cva([
  'p-1',
  'bg-white',
  'rounded-2xl',
  'shadow-xl',
  'w-[36rem]',
  'flex flex-col gap-2',
]);
const cvaSummaryPopTextBlock = cva(['flex flex-col gap-0.5']);
const cvaSummaryMonthTitle = cva(['capitalize text-xs text-center'], {
  variants: {
    isCurrent: {
      true: 'opacity-100',
      false: 'opacity-50',
    },
  },
});

const animatePopVariants = {
  closed: { y: '10%', opacity: 0 },
  open: { y: '0%', opacity: 1 },
};
const SummaryPop: FC<SummaryPopInterface> = ({
  startPeriod,
  endPeriod,
  summary,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [popOpen, setPopOpen] = useState<boolean>(false);

  const getMonthSummary = (monthId: number) => {
    return summary.find((item) => item.monthId == monthId);
  };
  const storeScrollState = useAppSelector(timelineSelectors.timeLineScroll);
  const scrollOffset = useAppSelector(
    containerParametersSelectors.containerParameters
  ).card;

  const getMonthsIds = () => {
    const days = calculateDaysQnt(startPeriod, endPeriod);
    const result: { monthId: number; offset: number }[] = [];
    let offset = 0;
    days.map((day) => {
      if (isFirstDayOfMonth(day)) {
        result.push({ monthId: day.getMonth(), offset: offset });
      }
      offset += 30;
    });
    return result;
  };
  const getMonthIdByOffset = (
    offset: number,
    monthIds: { monthId: number; offset: number }[]
  ) => {
    let result = monthIds[0];
    monthIds.map((item) => {
      if (offset >= item.offset) {
        result = item;
      }
    });
    return result;
  };

  const [currentSummary, setCurrentSummary] = useState(summary[0]);

  useEffect(() => {
    const currentMonth = getMonthIdByOffset(
      storeScrollState + scrollOffset,
      getMonthsIds()
    );
    setCurrentSummary(getMonthSummary(currentMonth.monthId) ?? summary[0]);
  }, [storeScrollState]);

  const monthsIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const swiperRef = useRef<SwiperRef>(null);

  useEffect(() => {
    if (swiperRef.current?.swiper) {
      swiperRef.current?.swiper.slideTo(currentSummary.monthId);
    }
  }, [currentSummary, popOpen]);

  return (
    <div ref={containerRef} className={cvaSummaryPopRoot()}>
      <AnimatePresence>
        {popOpen && (
          <motion.div
            className={cvaSummaryPop()}
            variants={animatePopVariants}
            initial={'closed'}
            animate={'open'}
            exit={'closed'}>
            <div className={'w-full'}>
              <Swiper
                ref={swiperRef}
                slidesPerView={5}
                centeredSlides={true}
                spaceBetween={30}>
                {monthsIds.map((month, counter) => {
                  const tempDate = format(
                    new Date(new Date().getFullYear(), month, 1),
                    'LLLL',
                    { locale: ru }
                  );
                  return (
                    <SwiperSlide key={counter}>
                      <p
                        className={cvaSummaryMonthTitle({
                          isCurrent: month == currentSummary.monthId,
                        })}>
                        {tempDate}
                      </p>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
            <div className={cvaSummaryPopTextBlock()}>
              <TaskTimer
                height={'md'}
                status={'pending'}
                category={'money'}
                fact={currentSummary.fact}
                plan={currentSummary.plan}
              />
              <TaskProgress
                isDisplayingPercent
                task={formatPrice(currentSummary.goal)}
                status={'pending'}
                completePercent={currentSummary.goalPercent}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Button
        onClick={() => {
          setPopOpen(!popOpen);
        }}
        className={cvaSummaryPopBtn()}>
        {popOpen ? 'Скрыть' : 'Показать итог за месяц'}
      </Button>
    </div>
  );
};

export default SummaryPop;
