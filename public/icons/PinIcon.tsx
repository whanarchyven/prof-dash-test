import React, { FC } from 'react';

interface PinIconProps {
  color?: string;
  size?: number;
  fillOpacity?: number;
}
const PinIcon: FC<PinIconProps> = ({ color, size, fillOpacity }) => {
  return (
    <svg
      width={size ?? 15}
      height={size ?? 15}
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.54248 6.40566C3.97507 6.33135 2.58937 6.88003 1.87811 8.0005L1.56074 7.81725C1.18028 7.59758 0.742066 7.64352 0.582568 7.9198C0.42307 8.19608 0.602394 8.59859 0.982845 8.81826L5.41394 11.3767L3.40982 14.8482C3.25032 15.1245 3.42964 15.527 3.81009 15.7467C4.19055 15.9664 4.62877 15.9204 4.78826 15.6441L6.79239 12.1726L11.2339 14.7371C11.6143 14.9568 12.0525 14.9108 12.212 14.6346C12.3715 14.3583 12.1922 13.9558 11.8117 13.7361L11.6388 13.6363C12.2773 12.4142 12.0177 10.8702 11.0856 9.51141L14.0707 4.34077C14.5495 3.51145 14.0119 2.30479 12.8699 1.6454L11.5031 0.856246C10.3613 0.196983 9.04737 0.334588 8.5686 1.1639L5.54248 6.40566Z"
        fill={color ?? '#070707'}
        fill-opacity={fillOpacity ?? 1}
      />
    </svg>
  );
};

export default PinIcon;
