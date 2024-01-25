import TaskTimer from '@/shared/ui/task-timer/ui';
import Search from '@/shared/ui/search/ui';
import Category from '@/shared/ui/category/ui/Category';
import StageProgressCountdown from '@/shared/ui/stage-progress-countdown/ui/StageProgressCountdown';
import InvoiceProgress from '@/shared/ui/invoice-progress/ui/InvoiceProgress';
import DropdownItem from '@/shared/ui/dropdown-item/ui/DropdownItem';
import SortDropdown from '@/shared/ui/sort-dropdown/ui';
import TaskProgress from '@/shared/ui/task-progress/ui';
import StageItem from '@/entities/stage-item/ui';
import CardHeader from '@/shared/ui/card-header/ui';
import CardItem from '@/entities/card-item/ui';
import TimeLine from '@/features/timeline';
import StageCard from '@/features/stage-card';

export default function Home() {
  return (
    <>
      <main>
        <h1 className={'mt-4  ml-2'}>Разработка UI: TaskTimer</h1>
        {/*<Button href={'/another-page'}>Go to another page</Button>*/}
        <div className={'mt-2 ml-2 grid grid-cols-4 gap-2 w-1/2'}>
          <TaskTimer
            category={'time'}
            height={'lg'}
            status={'default'}
            fact={24}
            plan={76}></TaskTimer>
          <TaskTimer
            category={'time'}
            height={'lg'}
            status={'default'}
            fact={52}
            plan={76}></TaskTimer>
          <TaskTimer
            category={'time'}
            height={'lg'}
            status={'completed'}
            fact={52}
            plan={76}></TaskTimer>
          <TaskTimer
            category={'time'}
            height={'lg'}
            status={'failed'}
            fact={52}
            plan={76}></TaskTimer>

          <TaskTimer
            category={'profit'}
            height={'lg'}
            status={'default'}
            fact={5}
            plan={10}></TaskTimer>
          <TaskTimer
            category={'profit'}
            height={'lg'}
            status={'default'}
            fact={7}
            plan={10}></TaskTimer>
          <TaskTimer
            category={'profit'}
            height={'lg'}
            status={'completed'}
            fact={20}
            plan={10}></TaskTimer>
          <TaskTimer
            category={'profit'}
            height={'lg'}
            status={'failed'}
            fact={5}
            plan={10}></TaskTimer>
        </div>

        <div className={'mt-2 ml-2 grid grid-cols-4 gap-2 w-1/2'}>
          <TaskTimer
            isShort={true}
            height={'lg'}
            category={'time'}
            status={'default'}
            fact={24}
            plan={76}></TaskTimer>
          <TaskTimer
            isShort={true}
            height={'lg'}
            category={'time'}
            status={'default'}
            fact={52}
            plan={76}></TaskTimer>
          <TaskTimer
            isShort={true}
            height={'lg'}
            category={'time'}
            status={'completed'}
            fact={52}
            plan={76}></TaskTimer>
          <TaskTimer
            isShort={true}
            height={'lg'}
            category={'time'}
            status={'failed'}
            fact={52}
            plan={76}></TaskTimer>

          <TaskTimer
            isShort={true}
            height={'lg'}
            category={'profit'}
            status={'default'}
            fact={5}
            plan={10}></TaskTimer>
          <TaskTimer
            isShort={true}
            height={'lg'}
            category={'profit'}
            status={'default'}
            fact={7}
            plan={10}></TaskTimer>
          <TaskTimer
            isShort={true}
            height={'lg'}
            category={'profit'}
            status={'completed'}
            fact={20}
            plan={10}></TaskTimer>
          <TaskTimer
            isShort={true}
            height={'lg'}
            category={'profit'}
            status={'failed'}
            fact={5}
            plan={10}></TaskTimer>
        </div>

        <h1 className={'mt-4  ml-2'}>Search</h1>
        <div
          className={'mt-2 ml-2 grid grid-cols-2 py-5 bg-gray-100 gap-2 w-1/2'}>
          <Search placeholder={'Введите значение'} state={'default'} />
        </div>

        <h1 className={'mt-4  ml-2'}>Category</h1>
        <div className={'mt-2 ml-2 flex items-center gap-1 py-5 gap-2 w-1/2'}>
          <Category category={'development'}></Category>
          <Category category={'oneTimeWorks'}></Category>
          <Category category={'tm'}></Category>
          <Category category={'seo'}></Category>
          <Category category={'hours'}></Category>
        </div>

        <h1 className={'mt-4  ml-2'}>Stage Progress</h1>
        <div className={'mt-2 ml-2 flex items-center gap-1 py-5 gap-2 w-1/2'}>
          <StageProgressCountdown dayRemains={-1}>
            1 день назад
          </StageProgressCountdown>
          <StageProgressCountdown dayRemains={2}>2 дня</StageProgressCountdown>
          <StageProgressCountdown dayRemains={5}>5 дней</StageProgressCountdown>
          <StageProgressCountdown dayRemains={7}>7 дней</StageProgressCountdown>
          <StageProgressCountdown dayRemains={10}>
            10 дней
          </StageProgressCountdown>
          <StageProgressCountdown dayRemains={15}>
            15 дней
          </StageProgressCountdown>
          <StageProgressCountdown dayRemains={20}>
            20 дней
          </StageProgressCountdown>
          <StageProgressCountdown dayRemains={25}>
            25 дней
          </StageProgressCountdown>
          <StageProgressCountdown dayRemains={34}>
            34 дня
          </StageProgressCountdown>
        </div>

        <h1 className={'mt-4  ml-2'}>Invoice Progress</h1>
        <div className={'mt-2 ml-2 flex items-center gap-1 py-5 gap-2 w-1/2'}>
          <InvoiceProgress status={'planning'}>220 000 ₽</InvoiceProgress>
          <InvoiceProgress status={'setting'}>220 000 ₽</InvoiceProgress>
          <InvoiceProgress status={'ready'}>220 000 ₽</InvoiceProgress>
          <InvoiceProgress status={'sended'}>220 000 ₽</InvoiceProgress>
          <InvoiceProgress status={'closed'}>220 000 ₽</InvoiceProgress>
          <InvoiceProgress status={'transit'}>220 000 ₽</InvoiceProgress>
        </div>

        <h1 className={'mt-4  ml-2'}>Dropdown Items</h1>
        <div className={'mt-2 ml-2 grid grid-cols-4 gap-5 py-5  '}>
          <div className={'flex flex-col gap-1'}>
            <DropdownItem
              isAllItems={false}
              category={'category'}
              dropdownItems={[{ category: 'development' }]}
            />
            <DropdownItem
              checked
              isAllItems={false}
              category={'category'}
              dropdownItems={[{ category: 'development' }]}
            />
            <DropdownItem
              isAllItems={false}
              category={'category'}
              dropdownItems={[{ category: 'oneTimeWorks' }]}
            />
            <DropdownItem
              checked
              isAllItems={false}
              category={'category'}
              dropdownItems={[{ category: 'oneTimeWorks' }]}
            />
            <DropdownItem
              isAllItems={false}
              category={'category'}
              dropdownItems={[{ category: 'seo' }]}
            />
            <DropdownItem
              checked
              isAllItems={false}
              category={'category'}
              dropdownItems={[{ category: 'seo' }]}
            />
            <DropdownItem
              isAllItems={false}
              category={'category'}
              dropdownItems={[{ category: 'hours' }]}
            />
            <DropdownItem
              checked
              isAllItems={false}
              category={'category'}
              dropdownItems={[{ category: 'hours' }]}
            />
            <DropdownItem
              isAllItems={false}
              category={'category'}
              dropdownItems={[{ category: 'tm' }]}
            />
            <DropdownItem
              checked
              isAllItems={false}
              category={'category'}
              dropdownItems={[{ category: 'tm' }]}
            />
          </div>

          <div className={'flex flex-col gap-1'}>
            <DropdownItem
              isAllItems={false}
              category={'pay'}
              dropdownItems={[{ status: 'nextWeek' }]}
            />
            <DropdownItem
              checked
              isAllItems={false}
              category={'pay'}
              dropdownItems={[{ status: 'nextWeek' }]}
            />
            <DropdownItem
              isAllItems={false}
              category={'pay'}
              dropdownItems={[{ status: 'thisWeek' }]}
            />
            <DropdownItem
              checked
              isAllItems={false}
              category={'pay'}
              dropdownItems={[{ status: 'thisWeek' }]}
            />
            <DropdownItem
              isAllItems={false}
              category={'pay'}
              dropdownItems={[{ status: 'expired' }]}
            />
            <DropdownItem
              checked
              isAllItems={false}
              category={'pay'}
              dropdownItems={[{ status: 'expired' }]}
            />
          </div>

          <div className={'flex flex-col gap-1'}>
            <DropdownItem
              isAllItems={false}
              category={'manager'}
              dropdownItems={[
                {
                  name: 'Елизавета Которова',
                  avatar: '/images/employees_temp/1.png',
                },
              ]}
            />
            <DropdownItem
              checked
              isAllItems={false}
              category={'manager'}
              dropdownItems={[
                {
                  name: 'Елизавета Которова',
                  avatar: '/images/employees_temp/1.png',
                },
              ]}
            />
            <DropdownItem
              isAllItems={false}
              category={'manager'}
              dropdownItems={[
                {
                  name: 'Дмитрий Голиков',
                  avatar: '/images/employees_temp/2.png',
                },
              ]}
            />
            <DropdownItem
              checked
              isAllItems={false}
              category={'manager'}
              dropdownItems={[
                {
                  name: 'Дмитрий Голиков',
                  avatar: '/images/employees_temp/2.png',
                },
              ]}
            />
            <DropdownItem
              isAllItems={false}
              category={'manager'}
              dropdownItems={[
                {
                  name: 'Ксения Гривская',
                  avatar: '/images/employees_temp/3.png',
                },
              ]}
            />
            <DropdownItem
              checked
              isAllItems={false}
              category={'manager'}
              dropdownItems={[
                {
                  name: 'Ксения Гривская',
                  avatar: '/images/employees_temp/3.png',
                },
              ]}
            />
          </div>
        </div>

        <div className={'mt-2 ml-2 grid grid-cols-4 gap-5 py-5  '}>
          <div className={'flex flex-col gap-1'}>
            <DropdownItem
              isAllItems={true}
              category={'category'}
              dropdownItems={[
                { category: 'development' },
                { category: 'oneTimeWorks' },
                { category: 'seo' },
                { category: 'hours' },
                { category: 'tm' },
              ]}
            />
            <DropdownItem
              isAllItems={true}
              checked
              category={'category'}
              dropdownItems={[
                { category: 'development' },
                { category: 'oneTimeWorks' },
                { category: 'seo' },
                { category: 'hours' },
                { category: 'tm' },
              ]}
            />
          </div>

          <div className={'flex flex-col gap-1'}>
            <DropdownItem
              isAllItems={true}
              category={'pay'}
              dropdownItems={[
                { status: 'nextWeek' },
                { status: 'thisWeek' },
                { status: 'expired' },
              ]}
            />
            <DropdownItem
              isAllItems={true}
              checked
              category={'pay'}
              dropdownItems={[
                { status: 'nextWeek' },
                { status: 'thisWeek' },
                { status: 'expired' },
              ]}
            />
          </div>

          <div className={'flex flex-col gap-1'}>
            <DropdownItem
              isAllItems={true}
              category={'manager'}
              dropdownItems={[
                {
                  name: 'Елизавета Которова',
                  avatar: '/images/employees_temp/1.png',
                },
                {
                  name: 'Дмитрий Голиков',
                  avatar: '/images/employees_temp/2.png',
                },
                {
                  name: 'Ксения Гривская',
                  avatar: '/images/employees_temp/3.png',
                },
              ]}
            />
            <DropdownItem
              isAllItems={true}
              checked
              category={'manager'}
              dropdownItems={[
                {
                  name: 'Елизавета Которова',
                  avatar: '/images/employees_temp/1.png',
                },
                {
                  name: 'Дмитрий Голиков',
                  avatar: '/images/employees_temp/2.png',
                },
                {
                  name: 'Ксения Гривская',
                  avatar: '/images/employees_temp/3.png',
                },
              ]}
            />
          </div>
        </div>
        <h1 className={'mt-4  ml-2'}>Sort Dropdown</h1>
        <div
          className={
            'mt-2 bg-gray-100 ml-2 grid grid-cols-3 items-center gap-1 py-5 gap-2'
          }>
          <SortDropdown state={'default'} category={'category'}></SortDropdown>
          <SortDropdown state={'default'} category={'manager'}></SortDropdown>
          <SortDropdown state={'default'} category={'pay'}></SortDropdown>
        </div>
        <h1 className={'mt-4  ml-2'}>TaskProgress</h1>
        {/*<Button href={'/another-page'}>Go to another page</Button>*/}
        <div className={'mt-2 px-2 grid grid-cols-4 gap-2 '}>
          <TaskProgress
            task={'Программирование'}
            completePercent={25}
            status={'pending'}
          />
          <TaskProgress task={'Дизайн'} status={'completed'} />
          <TaskProgress
            task={'SEO стратегия'}
            completePercent={75}
            status={'pending'}
          />
          <TaskProgress task={'Рекламная кампания'} status={'pending'} />
        </div>
        <div className={'mt-2 mb-5 px-2 grid grid-cols-4 gap-2 '}>
          <TaskProgress
            isShort
            task={'Программирование'}
            completePercent={25}
            status={'pending'}
          />
          <TaskProgress isShort task={'Дизайн'} status={'completed'} />
          <TaskProgress
            isShort
            task={'SEO стратегия'}
            completePercent={75}
            status={'pending'}
          />
          <TaskProgress
            isShort
            task={'Рекламная кампания'}
            status={'default'}
          />
        </div>

        <h1 className={'mt-4  ml-2'}>StageItem</h1>
        <div className={'my-2 px-2 grid grid-cols-4 gap-2 '}>
          <StageItem
            height={'lg'}
            taskProgressStatus={'default'}
            taskProgressCompletePercent={25}
            payment={{ status: 'planning', children: '400 000' }}
            category={'time'}
            status={'default'}
            fact={0}
            plan={78}></StageItem>
          <StageItem
            height={'lg'}
            taskProgressStatus={'pending'}
            taskProgressCompletePercent={10}
            payment={{ status: 'planning', children: '400 000' }}
            category={'time'}
            status={'pending'}
            fact={10}
            plan={78}></StageItem>
          <StageItem
            height={'lg'}
            taskProgressStatus={'pending'}
            taskProgressCompletePercent={75}
            prepayment={{ status: 'closed', children: '120 000' }}
            payment={{ status: 'planning', children: '400 000' }}
            category={'time'}
            status={'failed'}
            fact={10}
            plan={78}></StageItem>
          <StageItem
            height={'lg'}
            taskProgressStatus={'completed'}
            taskProgressCompletePercent={75}
            payment={{ status: 'closed', children: '10 000' }}
            category={'time'}
            status={'completed'}
            fact={56}
            plan={78}></StageItem>
        </div>
        <div className={'my-2 px-2 grid grid-cols-4 gap-2 '}>
          <StageItem
            height={'lg'}
            taskProgressStatus={'default'}
            taskProgressCompletePercent={25}
            payment={{ status: 'planning', children: '400 000' }}
            category={'time'}
            isShort={true}
            status={'default'}
            fact={0}
            plan={78}></StageItem>
          <StageItem
            height={'lg'}
            taskProgressStatus={'pending'}
            taskProgressCompletePercent={10}
            payment={{ status: 'planning', children: '400 000' }}
            category={'time'}
            isShort={true}
            status={'pending'}
            fact={10}
            plan={78}></StageItem>
          <StageItem
            height={'lg'}
            taskProgressStatus={'pending'}
            taskProgressCompletePercent={75}
            prepayment={{ status: 'closed', children: '120 000' }}
            payment={{ status: 'planning', children: '400 000' }}
            category={'time'}
            isShort={true}
            status={'failed'}
            fact={10}
            plan={78}></StageItem>
          <StageItem
            height={'lg'}
            taskProgressStatus={'completed'}
            taskProgressCompletePercent={75}
            payment={{ status: 'closed', children: '10 000' }}
            category={'time'}
            isShort={true}
            status={'completed'}
            fact={56}
            plan={78}></StageItem>
        </div>

        <h1 className={'mt-4  ml-2'}>CardHeader</h1>
        <div className={'my-2 py-2 bg-gray-500 px-2 grid grid-cols-3 gap-2 '}>
          <CardHeader
            customer={'HyperPC'}
            dateStart={new Date('2023-12-17')}
            dateEnd={new Date('2024-1-17')}
            category={'development'}
            manager={{
              name: 'Елизавета Которова',
              avatar: '/images/employees_temp/1.png',
            }}></CardHeader>
        </div>

        <h1 className={'mt-4  ml-2'}>CardItem</h1>
        <div className={'my-2 py-2 bg-gray-500 px-2 grid grid-cols-3 gap-2 '}>
          <CardItem
            totalCheck={139000}
            prepayment={20000}
            time={{ fact: 56, plan: 72, category: 'time', status: 'default' }}
            profit={{
              fact: 20,
              plan: 10,
              category: 'profit',
              status: 'completed',
            }}
            stageProgress={{ dayRemains: 20 }}
            customer={'HyperPC'}
            dateStart={new Date('2023-12-17')}
            dateEnd={new Date('2024-1-17')}
            category={'hours'}
            manager={{
              name: 'Елизавета Которова',
              avatar: '/images/employees_temp/1.png',
            }}
          />
        </div>

        <h1 className={'mt-4  ml-2'}>TimeLine</h1>
        <div className={'my-2 bg-cGray py-2 px-2 w-full h-[700px]'}>
          <TimeLine
            stages={[
              {
                dateStart: new Date('2023-12-15'),
                dateEnd: new Date('2023-12-31'),
                stageInfo: {
                  height: 'md',
                  taskProgressStatus: 'completed',
                  taskProgressCompletePercent: 75,
                  payment: { status: 'closed', children: '10 000' },
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
                  prepayment: { status: 'closed', children: '10 000' },
                  payment: { status: 'closed', children: '10 000' },
                  category: 'time',
                  status: 'failed',
                  fact: 32,
                  plan: 78,
                },
              },
              {
                dateStart: new Date('2024-01-05'),
                dateEnd: new Date('2024-01-19'),
                stageInfo: {
                  height: 'md',
                  taskProgressStatus: 'pending',
                  taskProgressCompletePercent: 75,
                  prepayment: { status: 'closed', children: '100 000' },
                  payment: { status: 'sended', children: '10 000' },
                  category: 'time',
                  status: 'pending',
                  fact: 56,
                  plan: 78,
                },
              },
            ]}
          />
        </div>

        <h1 className={'mt-4  ml-2'}>CardItem</h1>
        <div className={'my-2 bg-cGray py-2 px-2 w-full'}>
          <StageCard
            task={{
              totalCheck: 139000,
              prepayment: 20000,
              time: { fact: 56, plan: 72, category: 'time', status: 'default' },
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
                  taskProgressCompletePercent: 75,
                  payment: { status: 'closed', children: '10 000' },
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
                  prepayment: { status: 'closed', children: '10 000' },
                  payment: { status: 'closed', children: '10 000' },
                  category: 'time',
                  status: 'failed',
                  fact: 32,
                  plan: 78,
                },
              },
              {
                dateStart: new Date('2024-01-05'),
                dateEnd: new Date('2024-01-19'),
                stageInfo: {
                  height: 'md',
                  taskProgressStatus: 'pending',
                  taskProgressCompletePercent: 75,
                  prepayment: { status: 'closed', children: '100 000' },
                  payment: { status: 'sended', children: '10 000' },
                  category: 'time',
                  status: 'pending',
                  fact: 56,
                  plan: 78,
                },
              },
            ]}
          />
        </div>
      </main>
    </>
  );
}
