import React, { FC } from 'react';

interface ArrowRightIconProps {
  color: string;
}
const ArrowRightIcon: FC<ArrowRightIconProps> = ({ color }) => {
  return (
    <svg
      width="8"
      height="14"
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.5 12.8334L6.5 7.00008L1.5 1.16675"
        stroke={color}
        stroke-width="1.6"
      />
    </svg>
  );
};

export default ArrowRightIcon;
