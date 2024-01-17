import Button from '@/shared/ui/button/ui';

export default function Home() {
  return (
    <>
      <main>
        <h1>Next.js Project home page</h1>
        <Button href={'/another-page'}>Go to another page</Button>
      </main>
    </>
  );
}
