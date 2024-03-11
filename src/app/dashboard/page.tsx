'use client';
import Button from '@/shared/ui/button/ui';
import { cva } from 'class-variance-authority';
import Search from '@/shared/ui/search/ui';
import React, { useEffect } from 'react';
import TimelineHeader from '@/features/timeline/ui/timeline-header';
import Accordeon from '@/shared/ui/accordeon/ui';
import StageCard from '@/features/stage-card';
import TodayLine from '@/features/timeline/ui/today-line';
import SortDropDowns from '@/shared/ui/sort-dropdown/ui/SortDropDowns';
import SummaryPop from '@/features/summary-pop';
import YearHeader from '@/features/timeline/ui/year-header';
import { setScroll } from '@/shared/store/timelineSlice';
import { useAppDispatch } from '@/shared/store/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/store/hooks/useAppSelector';
import { containerParametersSelectors } from '@/shared/store/containerWidthSlice';
import { calculateTodayOffset } from '@/features/timeline/utils/calculateTodayOffset';
import { calculateDaysQnt } from '@/features/timeline/utils/calculateDaysQnt';
import { getMockData } from '@/shared/utils/getMockData';
import { IProject } from '@/features/stage-card/types/IProject';

const cvaRoot = cva(['p-2.4 pt-0', 'bg-cGrayBg', 'min-h-screen']);

const cvaHeaderContainer = cva([
  'sticky top-0 z-[999]',
  'pt-2.4',
  'bg-cGrayBg',
  'flex flex-col gap-2',
]);

const cvaHeader = cva(['flex items-center', 'justify-between']);

const cvaHeaderTitle = cva(['text-[3.4rem]']);

const cvaControlBlock = cva(['flex flex-wrap justify-end gap-1']);

const cvaDropFIltersButton = cva(['text-sm p-1 bg-white rounded-full']);

const cvaSearchInputBlock = cva(['']);

const cvaCardsBlock = cva(['relative', 'w-full', 'h-fit']);

const cvaTodayLineMask = cva([
  'absolute z-[99999] right-0',
  'h-screen w-2.4',
  'bg-cGrayBg',
]);

const cvaRootWrapper = cva(['overflow-x-clip']);

const tempStartPeriod = new Date('2023-10-12');
const tempEndPeriod = new Date('2024-03-16');
const cvaSummaryPop = cva(['fixed right-2.4 bottom-2.4 z-[9999]']);
const cvaTimelineHeaderRoot = cva(['relative h-2 w-full']);
const cvaTimelineYearRoot = cva(['relative h-1 w-full']);
const cvaTimelineHeaderWrapper = cva(['w-full absolute left-0']);
const cvaTimelineYearWrapper = cva(['w-full absolute left-0']);
const cvaAccordeonSubBlock = cva(['flex flex-col gap-1']);
const cvaAccordeonWrapper = cva(['my-2']);

export default function AnotherPage() {
  const containerParams = useAppSelector(
    containerParametersSelectors.containerParameters
  );

  const days = calculateDaysQnt(tempStartPeriod, tempEndPeriod);
  const maxWidth = days.length * 30;

  const todayOffset = calculateTodayOffset(
    tempStartPeriod,
    new Date(),
    maxWidth - containerParams.area
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (containerParams)
      dispatch(
        setScroll(
          todayOffset - (containerParams.container + containerParams.card) / 2
        )
      );
  }, [containerParams]);

  const data = getMockData();

  return (
    <div className={cvaRootWrapper()}>
      <main className={cvaRoot()}>
        <div className={cvaTodayLineMask()}></div>
        <div className={cvaSummaryPop()}>
          <SummaryPop
            startPeriod={tempStartPeriod}
            endPeriod={tempEndPeriod}
            summary={[
              {
                monthId: 9,
                goal: 520000,
                goalPercent: 20,
                fact: 100000,
                plan: 500000,
              },
              {
                monthId: 10,
                goal: 520000,
                goalPercent: 25,
                fact: 200000,
                plan: 500000,
              },
              {
                monthId: 11,
                goal: 520000,
                goalPercent: 20,
                fact: 100000,
                plan: 500000,
              },
              {
                monthId: 0,
                goal: 520000,
                goalPercent: 30,
                fact: 300000,
                plan: 500000,
              },
              {
                monthId: 1,
                goal: 520000,
                goalPercent: 50,
                fact: 400000,
                plan: 500000,
              },
            ]}
          />
        </div>
        <div className={cvaHeaderContainer()}>
          <div className={cvaHeader()}>
            <h1 className={cvaHeaderTitle()}>Рентабельность</h1>
            <div className={cvaControlBlock()}>
              <div className={cvaSearchInputBlock()}>
                <Search placeholder={'Найти проект'}></Search>
              </div>
              <SortDropDowns />
              <Button onClick={() => {}} className={cvaDropFIltersButton()}>
                Очистить
              </Button>
            </div>
          </div>
          <div className={cvaTimelineYearRoot()}>
            <div className={cvaTimelineYearWrapper()}>
              <YearHeader
                startPeriod={tempStartPeriod}
                endPeriod={tempEndPeriod}
              />
            </div>
          </div>
          <div className={cvaTimelineHeaderRoot()}>
            <div className={cvaTimelineHeaderWrapper()}>
              <TimelineHeader
                startPeriod={tempStartPeriod}
                endPeriod={tempEndPeriod}
              />
            </div>
          </div>
          <TodayLine startPeriod={tempStartPeriod} endPeriod={tempEndPeriod} />
        </div>

        <div className={cvaCardsBlock()}>
          <div className={cvaAccordeonWrapper()}>
            <Accordeon isOpen={true} childrensQnt={5} title={'Все'}>
              <div className={cvaAccordeonSubBlock()}>
                {data[0].projects.map((project: IProject, counter: number) => (
                  <StageCard
                    key={counter}
                    startPeriod={tempStartPeriod}
                    endPeriod={tempEndPeriod}
                    project={project}
                    stages={project.stages}
                  />
                ))}
              </div>
            </Accordeon>
          </div>
        </div>
      </main>
    </div>
  );
}
