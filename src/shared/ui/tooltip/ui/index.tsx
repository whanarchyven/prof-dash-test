'use client';
import { FC, ReactNode } from 'react';
import { cva } from 'class-variance-authority';
import { motion } from 'framer-motion';
import ToolTipLeg from '../../../../../public/icons/tooltip_leg.svg';

export interface ToolTipInterface {
  children: ReactNode;
}

const cvaToolTipRoot = cva([
  'absolute -top-[5rem] z-50',
  'flex flex-col items-center justify-end',
]);
const cvaToolTipBody = cva([
  'bg-cGray',
  'rounded-xl',
  'p-1 w-fit max-w-[20rem]',
  'flex items-center justify-center',
  'font-secondary text-white text-center text-xs',
]);
const animateToolTipVariants = {
  closed: { y: '-10%', opacity: 0 },
  open: { y: '0', opacity: 1 },
};

const ToolTip: FC<ToolTipInterface> = ({ children }) => {
  return (
    <motion.div
      variants={animateToolTipVariants}
      initial={'closed'}
      animate={'open'}
      exit={'close'}
      className={cvaToolTipRoot()}>
      <div className={cvaToolTipBody()}>{children}</div>
      <ToolTipLeg />
    </motion.div>
  );
};

export default ToolTip;
