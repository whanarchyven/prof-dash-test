import { FC } from 'react';
import UserTab from '@/widgets/click-app-auth/ui/UserTab';
import { cva } from 'class-variance-authority';
import ClickAppAuthProvider from '@/features/click-app-auth-provider';

export interface ClickAppAuthInterface {}

const cvaClickAppAuthRoot = cva([
  'bg-white',
  'p-10',
  'flex flex-col items-center justify-center gap-4',
  'rounded-xl',
]);
const ClickAppAuth: FC<ClickAppAuthInterface> = ({}) => {
  return (
    <div className={cvaClickAppAuthRoot()}>
      <UserTab
        avatarSrc={'/images/employees_temp/4.png'}
        username={'Егор Коротаев'}
      />
      <ClickAppAuthProvider />
    </div>
  );
};

export default ClickAppAuth;
