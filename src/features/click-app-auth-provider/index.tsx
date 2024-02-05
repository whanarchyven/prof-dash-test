'use client';
import { FC } from 'react';
import { cva } from 'class-variance-authority';
import Button from '@/shared/ui/button/ui';
import ClickAppLogo from '/public/images/clickAppLogo.svg';

const cvaClickAppAuthProviderRoot = cva([
  'flex flex-col gap-2 items-center justify-center',
]);
const cvaClickAppButton = cva([
  'bg-cBlue',
  'text-center text-white',
  'p-2',
  'rounded-2xl',
]);
const ClickAppAuthProvider: FC = () => {
  return (
    <div className={cvaClickAppAuthProviderRoot()}>
      <Button href={'/dashboard'} className={cvaClickAppButton()}>
        Авторизоваться через ClickApp
      </Button>
      <ClickAppLogo />
    </div>
  );
};

export default ClickAppAuthProvider;
