'use client';
import Button from '@/shared/ui/button/ui';
import { cva } from 'class-variance-authority';
import Search from '@/shared/ui/search/ui';
import React from 'react';
import SortDropdown from '@/shared/ui/sort-dropdown/ui';
import TimelineHeader from '@/features/timeline/ui/timeline-header';
import Accordeon from '@/shared/ui/accordeon/ui';
import StageCard from '@/features/stage-card';
import TodayLine from '@/features/timeline/ui/today-line';

const cvaRoot = cva(['p-2.4', 'bg-cGrayBg', 'min-h-screen']);

const cvaHeaderContainer = cva([
  'sticky top-0 z-[999]',
  'pt-2.4',
  'bg-cGrayBg',
  'flex flex-col gap-2',
]);

const cvaHeader = cva(['flex items-center', 'justify-between']);

const cvaHeaderTitle = cva(['text-[4.4rem]']);

const cvaControlBlock = cva(['flex flex-wrap justify-end gap-1']);

const cvaDropFIltersButton = cva(['text-sm p-1 bg-white rounded-full']);

const cvaSearchInputBlock = cva(['']);

const cvaCardsBlock = cva(['relative', 'w-full', 'mt-2', 'h-fit']);

const tempStartPeriod = new Date('2023-10-12');
const tempEndPeriod = new Date('2024-02-16');

export default function AnotherPage() {
  return (
    <>
      <main className={cvaRoot()}>
        <div className={cvaHeaderContainer()}>
          <div className={cvaHeader()}>
            <h1 className={cvaHeaderTitle()}>Рентабельность</h1>
            <div className={cvaControlBlock()}>
              <div className={cvaSearchInputBlock()}>
                <Search placeholder={'Найти проект'}></Search>
              </div>
              <SortDropdown
                state={'default'}
                category={'category'}></SortDropdown>
              <SortDropdown
                state={'default'}
                category={'manager'}></SortDropdown>
              <SortDropdown state={'default'} category={'pay'}></SortDropdown>
              <Button onClick={() => {}} className={cvaDropFIltersButton()}>
                Очистить
              </Button>
            </div>
          </div>
          <div className={'relative h-6 w-full'}>
            <div className={'w-full absolute left-0'}>
              <TimelineHeader
                startPeriod={tempStartPeriod}
                endPeriod={tempEndPeriod}
              />
            </div>
          </div>
          <TodayLine startPeriod={tempStartPeriod} endPeriod={tempEndPeriod} />
        </div>

        <div className={cvaCardsBlock()}>
          <div>
            <Accordeon isOpen={true} childrensQnt={2} title={'Закреплённые'}>
              <div className={'flex flex-col gap-3'}>
                <StageCard
                  startPeriod={tempStartPeriod}
                  endPeriod={tempEndPeriod}
                  task={{
                    isPined: true,
                    totalCheck: 500000,
                    prepayment: 390000,
                    time: {
                      fact: 24,
                      plan: 76,
                      category: 'time',
                      status: 'default',
                    },
                    profit: {
                      fact: 20,
                      plan: 10,
                      category: 'profit',
                      status: 'completed',
                    },
                    height: 'md',
                    stageProgress: { dayRemains: -1 },
                    customer: 'IBankrot',
                    dateStart: new Date('2023-12-17'),
                    dateEnd: new Date('2024-1-17'),
                    category: 'hours',
                    manager: {
                      name: 'Елизавета Которова',
                      avatar: '/images/employees_temp/2.png',
                    },
                  }}
                  stages={[
                    {
                      dateStart: new Date('2023-12-04'),
                      dateEnd: new Date('2023-12-14'),
                      stageInfo: {
                        height: 'md',
                        taskProgressStatus: 'completed',
                        task: 'Сверстать дашборд',
                        taskProgressCompletePercent: 75,
                        payment: { status: 'closed', amount: 10000 },
                        category: 'time',
                        status: 'completed',
                        fact: 56,
                        plan: 78,
                      },
                    },
                    {
                      dateStart: new Date('2023-12-12'),
                      dateEnd: new Date('2023-12-13'),
                      stageInfo: {
                        height: 'md',
                        taskProgressStatus: 'pending',
                        taskProgressCompletePercent: 30,
                        task: 'Сверстать дашборд 2',
                        prepayment: { status: 'closed', amount: 10000 },
                        payment: { status: 'closed', amount: 10000 },
                        category: 'time',
                        status: 'failed',
                        fact: 32,
                        plan: 78,
                      },
                    },
                    {
                      dateStart: new Date('2023-12-15'),
                      dateEnd: new Date('2023-12-25'),
                      stageInfo: {
                        height: 'md',
                        taskProgressStatus: 'pending',
                        taskProgressCompletePercent: 75,
                        task: 'Сверстать дашборд 3 ',
                        prepayment: { status: 'closed', amount: 100000 },
                        payment: { status: 'sended', amount: 10000 },
                        category: 'time',
                        status: 'pending',
                        fact: 56,
                        plan: 78,
                      },
                    },
                  ]}
                />
                <StageCard
                  startPeriod={tempStartPeriod}
                  endPeriod={tempEndPeriod}
                  task={{
                    isPined: true,
                    totalCheck: 139000,
                    prepayment: 20000,
                    time: {
                      fact: 56,
                      plan: 72,
                      category: 'time',
                      status: 'default',
                    },
                    profit: {
                      fact: 20,
                      plan: 10,
                      category: 'profit',
                      status: 'completed',
                    },
                    height: 'md',
                    stageProgress: { dayRemains: 20 },
                    customer: 'HyperPC',
                    dateStart: new Date('2023-12-17'),
                    dateEnd: new Date('2024-1-17'),
                    category: 'hours',
                    manager: {
                      name: 'Елизавета Которова',
                      avatar: '/images/employees_temp/1.png',
                    },
                  }}
                  stages={[
                    {
                      dateStart: new Date('2023-12-15'),
                      dateEnd: new Date('2023-12-31'),
                      stageInfo: {
                        height: 'md',
                        taskProgressStatus: 'completed',
                        task: 'Сверстать дашборд',
                        taskProgressCompletePercent: 75,
                        payment: { status: 'closed', amount: 10000 },
                        category: 'time',
                        status: 'completed',
                        fact: 56,
                        plan: 78,
                      },
                    },
                    {
                      dateStart: new Date('2023-12-22'),
                      dateEnd: new Date('2024-01-02'),
                      stageInfo: {
                        height: 'md',
                        taskProgressStatus: 'pending',
                        taskProgressCompletePercent: 30,
                        task: 'Сверстать дашборд 2',
                        prepayment: { status: 'closed', amount: 10000 },
                        payment: { status: 'closed', amount: 10000 },
                        category: 'time',
                        status: 'failed',
                        fact: 32,
                        plan: 78,
                      },
                    },
                    {
                      dateStart: new Date('2024-01-05'),
                      dateEnd: new Date('2024-01-10'),
                      stageInfo: {
                        height: 'md',
                        taskProgressStatus: 'pending',
                        taskProgressCompletePercent: 75,
                        task: 'Сверстать дашборд 3 ',
                        prepayment: { status: 'closed', amount: 100000 },
                        payment: { status: 'sended', amount: 10000 },
                        category: 'time',
                        status: 'pending',
                        fact: 56,
                        plan: 78,
                      },
                    },
                  ]}
                />
              </div>
            </Accordeon>
          </div>
          <div className={'mt-9'}>
            <Accordeon isOpen={true} childrensQnt={5} title={'Все'}>
              <div className={'flex flex-col gap-3'}>
                <StageCard
                  startPeriod={tempStartPeriod}
                  endPeriod={tempEndPeriod}
                  task={{
                    totalCheck: 139000,
                    prepayment: 20000,
                    time: {
                      fact: 56,
                      plan: 72,
                      category: 'time',
                      status: 'default',
                    },
                    profit: {
                      fact: 20,
                      plan: 10,
                      category: 'profit',
                      status: 'completed',
                    },
                    height: 'md',
                    stageProgress: { dayRemains: 20 },
                    customer: 'HyperPC',
                    dateStart: new Date('2023-12-17'),
                    dateEnd: new Date('2024-1-17'),
                    category: 'hours',
                    manager: {
                      name: 'Елизавета Которова',
                      avatar: '/images/employees_temp/1.png',
                    },
                  }}
                  stages={[
                    {
                      dateStart: new Date('2023-12-15'),
                      dateEnd: new Date('2023-12-31'),
                      stageInfo: {
                        height: 'md',
                        taskProgressStatus: 'completed',
                        task: 'Сверстать дашборд',
                        taskProgressCompletePercent: 75,
                        payment: { status: 'closed', amount: 10000 },
                        category: 'time',
                        status: 'completed',
                        fact: 56,
                        plan: 78,
                      },
                    },
                    {
                      dateStart: new Date('2023-12-22'),
                      dateEnd: new Date('2024-01-02'),
                      stageInfo: {
                        height: 'md',
                        taskProgressStatus: 'pending',
                        taskProgressCompletePercent: 30,
                        task: 'Сверстать дашборд 2',
                        prepayment: { status: 'closed', amount: 10000 },
                        payment: { status: 'closed', amount: 10000 },
                        category: 'time',
                        status: 'failed',
                        fact: 32,
                        plan: 78,
                      },
                    },
                    {
                      dateStart: new Date('2024-01-05'),
                      dateEnd: new Date('2024-01-10'),
                      stageInfo: {
                        height: 'md',
                        taskProgressStatus: 'pending',
                        taskProgressCompletePercent: 75,
                        task: 'Сверстать дашборд 3 ',
                        prepayment: { status: 'closed', amount: 100000 },
                        payment: { status: 'sended', amount: 10000 },
                        category: 'time',
                        status: 'pending',
                        fact: 56,
                        plan: 78,
                      },
                    },
                  ]}
                />
                <StageCard
                  startPeriod={tempStartPeriod}
                  endPeriod={tempEndPeriod}
                  task={{
                    totalCheck: 139000,
                    prepayment: 20000,
                    time: {
                      fact: 56,
                      plan: 72,
                      category: 'time',
                      status: 'default',
                    },
                    profit: {
                      fact: 20,
                      plan: 10,
                      category: 'profit',
                      status: 'completed',
                    },
                    height: 'md',
                    stageProgress: { dayRemains: 20 },
                    customer: 'HyperPC',
                    dateStart: new Date('2023-12-17'),
                    dateEnd: new Date('2024-1-17'),
                    category: 'hours',
                    manager: {
                      name: 'Елизавета Которова',
                      avatar: '/images/employees_temp/1.png',
                    },
                  }}
                  stages={[
                    {
                      dateStart: new Date('2023-12-15'),
                      dateEnd: new Date('2023-12-31'),
                      stageInfo: {
                        height: 'md',
                        taskProgressStatus: 'completed',
                        task: 'Сверстать дашборд',
                        taskProgressCompletePercent: 75,
                        payment: { status: 'closed', amount: 10000 },
                        category: 'time',
                        status: 'completed',
                        fact: 56,
                        plan: 78,
                      },
                    },
                    {
                      dateStart: new Date('2023-12-22'),
                      dateEnd: new Date('2024-01-02'),
                      stageInfo: {
                        height: 'md',
                        taskProgressStatus: 'pending',
                        taskProgressCompletePercent: 30,
                        task: 'Сверстать дашборд 2',
                        prepayment: { status: 'closed', amount: 10000 },
                        payment: { status: 'closed', amount: 10000 },
                        category: 'time',
                        status: 'failed',
                        fact: 32,
                        plan: 78,
                      },
                    },
                    {
                      dateStart: new Date('2024-01-05'),
                      dateEnd: new Date('2024-01-10'),
                      stageInfo: {
                        height: 'md',
                        taskProgressStatus: 'pending',
                        taskProgressCompletePercent: 75,
                        task: 'Сверстать дашборд 3 ',
                        prepayment: { status: 'closed', amount: 100000 },
                        payment: { status: 'sended', amount: 10000 },
                        category: 'time',
                        status: 'pending',
                        fact: 56,
                        plan: 78,
                      },
                    },
                  ]}
                />
                <StageCard
                  startPeriod={tempStartPeriod}
                  endPeriod={tempEndPeriod}
                  task={{
                    totalCheck: 139000,
                    prepayment: 20000,
                    time: {
                      fact: 56,
                      plan: 72,
                      category: 'time',
                      status: 'default',
                    },
                    profit: {
                      fact: 20,
                      plan: 10,
                      category: 'profit',
                      status: 'completed',
                    },
                    height: 'md',
                    stageProgress: { dayRemains: 20 },
                    customer: 'HyperPC',
                    dateStart: new Date('2023-12-17'),
                    dateEnd: new Date('2024-1-17'),
                    category: 'hours',
                    manager: {
                      name: 'Елизавета Которова',
                      avatar: '/images/employees_temp/1.png',
                    },
                  }}
                  stages={[
                    {
                      dateStart: new Date('2023-12-15'),
                      dateEnd: new Date('2023-12-31'),
                      stageInfo: {
                        height: 'md',
                        taskProgressStatus: 'completed',
                        task: 'Сверстать дашборд',
                        taskProgressCompletePercent: 75,
                        payment: { status: 'closed', amount: 10000 },
                        category: 'time',
                        status: 'completed',
                        fact: 56,
                        plan: 78,
                      },
                    },
                    {
                      dateStart: new Date('2023-12-22'),
                      dateEnd: new Date('2024-01-02'),
                      stageInfo: {
                        height: 'md',
                        taskProgressStatus: 'pending',
                        taskProgressCompletePercent: 30,
                        task: 'Сверстать дашборд 2',
                        prepayment: { status: 'closed', amount: 10000 },
                        payment: { status: 'closed', amount: 10000 },
                        category: 'time',
                        status: 'failed',
                        fact: 32,
                        plan: 78,
                      },
                    },
                    {
                      dateStart: new Date('2024-01-05'),
                      dateEnd: new Date('2024-01-10'),
                      stageInfo: {
                        height: 'md',
                        taskProgressStatus: 'pending',
                        taskProgressCompletePercent: 75,
                        task: 'Сверстать дашборд 3 ',
                        prepayment: { status: 'closed', amount: 100000 },
                        payment: { status: 'sended', amount: 10000 },
                        category: 'time',
                        status: 'pending',
                        fact: 56,
                        plan: 78,
                      },
                    },
                  ]}
                />
                <StageCard
                  startPeriod={tempStartPeriod}
                  endPeriod={tempEndPeriod}
                  task={{
                    totalCheck: 139000,
                    prepayment: 20000,
                    time: {
                      fact: 56,
                      plan: 72,
                      category: 'time',
                      status: 'default',
                    },
                    profit: {
                      fact: 20,
                      plan: 10,
                      category: 'profit',
                      status: 'completed',
                    },
                    height: 'md',
                    stageProgress: { dayRemains: 20 },
                    customer: 'HyperPC',
                    dateStart: new Date('2023-12-17'),
                    dateEnd: new Date('2024-1-17'),
                    category: 'hours',
                    manager: {
                      name: 'Елизавета Которова',
                      avatar: '/images/employees_temp/1.png',
                    },
                  }}
                  stages={[
                    {
                      dateStart: new Date('2023-12-15'),
                      dateEnd: new Date('2023-12-31'),
                      stageInfo: {
                        height: 'md',
                        taskProgressStatus: 'completed',
                        task: 'Сверстать дашборд',
                        taskProgressCompletePercent: 75,
                        payment: { status: 'closed', amount: 10000 },
                        category: 'time',
                        status: 'completed',
                        fact: 56,
                        plan: 78,
                      },
                    },
                    {
                      dateStart: new Date('2023-12-22'),
                      dateEnd: new Date('2024-01-02'),
                      stageInfo: {
                        height: 'md',
                        taskProgressStatus: 'pending',
                        taskProgressCompletePercent: 30,
                        task: 'Сверстать дашборд 2',
                        prepayment: { status: 'closed', amount: 10000 },
                        payment: { status: 'closed', amount: 10000 },
                        category: 'time',
                        status: 'failed',
                        fact: 32,
                        plan: 78,
                      },
                    },
                    {
                      dateStart: new Date('2024-01-05'),
                      dateEnd: new Date('2024-01-10'),
                      stageInfo: {
                        height: 'md',
                        taskProgressStatus: 'pending',
                        taskProgressCompletePercent: 75,
                        task: 'Сверстать дашборд 3 ',
                        prepayment: { status: 'closed', amount: 100000 },
                        payment: { status: 'sended', amount: 10000 },
                        category: 'time',
                        status: 'pending',
                        fact: 56,
                        plan: 78,
                      },
                    },
                  ]}
                />
                <StageCard
                  startPeriod={tempStartPeriod}
                  endPeriod={tempEndPeriod}
                  task={{
                    totalCheck: 139000,
                    prepayment: 20000,
                    time: {
                      fact: 56,
                      plan: 72,
                      category: 'time',
                      status: 'default',
                    },
                    profit: {
                      fact: 20,
                      plan: 10,
                      category: 'profit',
                      status: 'completed',
                    },
                    height: 'md',
                    stageProgress: { dayRemains: 20 },
                    customer: 'HyperPC',
                    dateStart: new Date('2023-12-17'),
                    dateEnd: new Date('2024-1-17'),
                    category: 'hours',
                    manager: {
                      name: 'Елизавета Которова',
                      avatar: '/images/employees_temp/1.png',
                    },
                  }}
                  stages={[
                    {
                      dateStart: new Date('2023-12-15'),
                      dateEnd: new Date('2023-12-31'),
                      stageInfo: {
                        height: 'md',
                        taskProgressStatus: 'completed',
                        task: 'Сверстать дашборд',
                        taskProgressCompletePercent: 75,
                        payment: { status: 'closed', amount: 10000 },
                        category: 'time',
                        status: 'completed',
                        fact: 56,
                        plan: 78,
                      },
                    },
                    {
                      dateStart: new Date('2023-12-22'),
                      dateEnd: new Date('2024-01-02'),
                      stageInfo: {
                        height: 'md',
                        taskProgressStatus: 'pending',
                        taskProgressCompletePercent: 30,
                        task: 'Сверстать дашборд 2',
                        prepayment: { status: 'closed', amount: 10000 },
                        payment: { status: 'closed', amount: 10000 },
                        category: 'time',
                        status: 'failed',
                        fact: 32,
                        plan: 78,
                      },
                    },
                    {
                      dateStart: new Date('2024-01-05'),
                      dateEnd: new Date('2024-01-10'),
                      stageInfo: {
                        height: 'md',
                        taskProgressStatus: 'pending',
                        taskProgressCompletePercent: 75,
                        task: 'Сверстать дашборд 3 ',
                        prepayment: { status: 'closed', amount: 100000 },
                        payment: { status: 'sended', amount: 10000 },
                        category: 'time',
                        status: 'pending',
                        fact: 56,
                        plan: 78,
                      },
                    },
                  ]}
                />
              </div>
            </Accordeon>
          </div>
        </div>
      </main>
    </>
  );
}
