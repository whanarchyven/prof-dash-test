import TaskTimer from '@/shared/ui/task-timer/ui';
import Search from '@/shared/ui/search/ui';
import Category from '@/shared/ui/category/ui/Category';

export default function Home() {
  return (
    <>
      <main>
        <h1 className={'mt-4  ml-2'}>Разработка UI: TaskTimer</h1>
        {/*<Button href={'/another-page'}>Go to another page</Button>*/}
        <div className={'mt-2 ml-2 grid grid-cols-4 gap-2 w-1/2'}>
          <TaskTimer
            category={'time'}
            status={'default'}
            fact={24}
            plan={76}></TaskTimer>
          <TaskTimer
            category={'time'}
            status={'default'}
            fact={52}
            plan={76}></TaskTimer>
          <TaskTimer
            category={'time'}
            status={'completed'}
            fact={52}
            plan={76}></TaskTimer>
          <TaskTimer
            category={'time'}
            status={'failed'}
            fact={52}
            plan={76}></TaskTimer>

          <TaskTimer
            category={'profit'}
            status={'default'}
            fact={5}
            plan={10}></TaskTimer>
          <TaskTimer
            category={'profit'}
            status={'default'}
            fact={7}
            plan={10}></TaskTimer>
          <TaskTimer
            category={'profit'}
            status={'completed'}
            fact={20}
            plan={10}></TaskTimer>
          <TaskTimer
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
      </main>
    </>
  );
}
