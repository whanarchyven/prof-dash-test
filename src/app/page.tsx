import ClickAppAuth from '@/widgets/click-app-auth';

export default function Home() {
  return (
    <>
      <main
        className={
          'bg-cGrayBg flex justify-center items-center h-screen w-full'
        }>
        <ClickAppAuth />
      </main>
    </>
  );
}
