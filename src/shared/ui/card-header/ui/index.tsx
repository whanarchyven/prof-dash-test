'use client';
import { cva, VariantProps } from 'class-variance-authority';
import { FC, useState } from 'react';
import Category, { categoryName } from '@/shared/ui/category/ui/Category';
import { employeeDropDown } from '@/shared/ui/dropdown-item/ui/DropdownItem';
import ArrowRightIcon from '../../../../../public/icons/arrow_right.svg';
import PinIcon from '../../../../../public/icons/PinIcon';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';

export interface CardHeaderProps
  extends VariantProps<typeof cvaRoot>,
    VariantProps<typeof cvaPinButton> {
  customer: string;
  dateStart: Date;
  dateEnd: Date;
  category: categoryName;
  manager: employeeDropDown;
  isPined?: boolean;
  isHovered?: boolean;
}

const cvaRoot = cva(['rounded-2xl', 'w-full min-w-fit flex gap-1'], {
  variants: {
    height: {
      xl: ['h-10'],
      lg: ['h-8'],
      md: ['h-6'],
      sm: ['h-4'],
      xs: ['h-2'],
    },
  },
});
const cvaPin = cva([
  'rounded-3xl',
  'bg-white',
  'w-5 p-0',
  'flex justify-center items-center',
  'cursor-pointer',
]);
const cvaPinButton = cva([
  '',
  {
    variants: {
      isHovered: {
        true: 'opacity-50',
        false: 'opacity-100',
      },
      isPined: {
        true: 'opacity-100',
        false: '',
      },
    },
  },
]);

const cvaTextBlock = cva(['flex flex-col gap-1']);
const cvaCustomerTitle = cva(['text-lg']);
const cvaCustomerBlock = cva(['flex items-center gap-0.5']);
const cvaDateTitle = cva([
  'capitalize whitespace-nowrap font-secondary text-[1.2rem] opacity-50',
]);
const cvaDateCategoryBlock = cva(['flex items-center gap-3']);
const cvaHeader = cva([
  'rounded-3xl',
  'bg-white',
  'w-full',
  'p-1.5 py-2',
  'flex justify-between gap-3 items-center',
]);
const cvaAvatar = cva(['rounded-full', 'h-7 aspect-square']);

const getDateTitle = (dateStart: Date, dateEnd: Date) => {
  if (
    dateStart.getMonth() == dateEnd.getMonth() &&
    dateStart.getFullYear() == dateEnd.getFullYear()
  ) {
    return dateStart
      .toLocaleString('default', { month: 'long' })
      .concat(' ', dateStart.getFullYear().toString());
  } else {
    return (
      <p className={cvaDateTitle()}>
        {dateStart
          .toLocaleString('default', { month: 'long' })
          .concat(' ', dateStart.getFullYear().toString(), ' - ')}
        <br />
        {dateEnd
          .toLocaleString('default', { month: 'long' })
          .concat(' ', dateEnd.getFullYear().toString())}
      </p>
    );
  }
};
const CardHeader: FC<CardHeaderProps> = ({
  category,
  customer,
  dateStart,
  dateEnd,
  isHovered,
  isPined,
  manager,
}) => {
  const [hovered, setHovered] = useState(isHovered ?? false);
  const [pined, setPined] = useState(isPined ?? false);

  const pinButtonAnimateVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: '-40%' },
  };

  const headerAnimateVariants = {
    open: { x: '2%' },
    closed: { x: '1%' },
  };

  return (
    <div
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      className={cvaRoot()}>
      {(hovered || pined) && (
        <AnimatePresence>
          <motion.div
            variants={pinButtonAnimateVariants}
            initial={'closed'}
            animate={'open'}
            exit={'closed'}
            onClick={() => {
              setPined(!pined);
            }}
            className={cvaPin()}>
            {!pined ? (
              <motion.div>
                <PinIcon
                  size={24}
                  fillOpacity={0.34}
                  color={'#3e3e3e'}></PinIcon>
              </motion.div>
            ) : (
              <motion.div>
                <PinIcon size={24} color={'#070707'}></PinIcon>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      )}
      <motion.div className={cvaHeader()}>
        <motion.div
          transition={{ duration: 0.1 }}
          variants={headerAnimateVariants}
          animate={hovered || pined ? 'open' : 'closed'}
          className={cvaTextBlock()}>
          <div className={cvaCustomerBlock()}>
            <p className={cvaCustomerTitle()}>{customer}</p>
            <ArrowRightIcon className={'arrow-right-black'} />
          </div>
          <div className={cvaDateCategoryBlock()}>
            {getDateTitle(dateStart, dateEnd)}
            <Category category={category}></Category>
          </div>
        </motion.div>
        <img className={cvaAvatar()} src={manager.avatar} />
      </motion.div>
    </div>
  );
};

export default CardHeader;
