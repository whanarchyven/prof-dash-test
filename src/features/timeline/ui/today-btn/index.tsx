import { FC } from 'react';
import { cva } from 'class-variance-authority';
import ArrowRightIcon from '/public/icons/arrow_right.svg';
import { motion } from 'framer-motion';

const cvaTodayButton = cva([
  'h-full',
  'bg-cGrayBg',
  'absolute right-0 z-20 ',
  'p-1 pb-0',
  'gap-1 flex justify-center items-center',
  'cursor-pointer',
]);
const cvaTodayButtonText = cva(['font-secondary text-cBlue text-sm']);
const cvaTodayButtonIcon = cva(['stroke-cBlue']);

const animateTodayBtnVariants = {
  closed: { y: '-10%', opacity: 0 },
  open: { y: 0, opacity: 1 },
};

export interface todayBtnProps {
  onClick?: () => any;
}

const TodayBtn: FC<todayBtnProps> = ({ onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      variants={animateTodayBtnVariants}
      initial={'closed'}
      animate={'open'}
      exit={'closed'}
      className={cvaTodayButton()}>
      <p className={cvaTodayButtonText()}>Сегодня</p>
      <ArrowRightIcon className={cvaTodayButtonIcon()} />
    </motion.div>
  );
};

export default TodayBtn;
