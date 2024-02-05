import { FC } from 'react';
import Image from 'next/image';
import { cva } from 'class-variance-authority';

interface UserTabInterface {
  avatarSrc: string;
  username: string;
}

const cvaUserTabRoot = cva(['flex items-center gap-2']);
const cvaUserTabAvataContainer = cva(['relative w-6 aspect-square']);
const cvaUserTabAvatar = cva(['rounded-full']);
const cvaUserTabUsername = cva([
  'font-secondary font-bold',
  'text-md text-black',
]);

const UserTab: FC<UserTabInterface> = ({ avatarSrc, username }) => {
  return (
    <div className={cvaUserTabRoot()}>
      <div className={cvaUserTabAvataContainer()}>
        <Image
          src={avatarSrc}
          className={cvaUserTabAvatar()}
          alt={username + '_avatar'}
          layout={'fill'}
        />
      </div>
      <p className={cvaUserTabUsername()}>{username}</p>
    </div>
  );
};

export default UserTab;
