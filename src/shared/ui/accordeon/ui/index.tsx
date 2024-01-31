'use client';
import { cva } from 'class-variance-authority';
import { FC, ReactNode, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import ArrowRightIcon from '/public/icons/arrow_right.svg';

interface AccordeonProps {
  isOpen?: boolean;
  children: ReactNode;
  childrensQnt: number;
  title: string;
}

const cvaRoot = cva(['flex flex-col gap-2']);
const cvaTextTitle = cva(['flex items-center gap-1', 'cursor-pointer']);
const cvaArrowRightIcon = cva(['stroke-cBlack']);

const Accordeon: FC<AccordeonProps> = ({
  isOpen,
  title,
  childrensQnt,
  children,
}) => {
  const [open, setOpen] = useState<boolean>(isOpen ?? false);

  const animateHiddenBlockVariants = {
    closed: { y: '-10%', opacity: 0 },
    open: { y: '0%', opacity: 1 },
  };

  const animateArrowVariants = {
    closed: { rotate: '90deg' },
    open: { rotate: '-90deg' },
  };

  return (
    <div className={cvaRoot()}>
      <div
        onClick={() => {
          setOpen(!open);
        }}
        className={cvaTextTitle()}>
        <p>
          {title} <span>{childrensQnt}</span>
        </p>
        <motion.div
          variants={animateArrowVariants}
          animate={open ? 'open' : 'closed'}>
          <ArrowRightIcon className={cvaArrowRightIcon()} />
        </motion.div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={'closed'}
            animate={'open'}
            exit={'closed'}
            variants={animateHiddenBlockVariants}
            className={''}>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordeon;
