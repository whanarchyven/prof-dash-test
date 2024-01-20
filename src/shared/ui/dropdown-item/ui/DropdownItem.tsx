'use client';
import { cva, VariantProps } from 'class-variance-authority';
import { FC, useState } from 'react';
import { categoryName, getCategory } from '@/shared/ui/category/ui/Category';
import StageProgressCountdown from '@/shared/ui/stage-progress-countdown/ui/StageProgressCountdown';
import CompletedIcon from '/public/icons/complete.svg';
import { motion } from 'framer-motion';

interface employeeDropDown {
  name: string;
  avatar: string;
}

interface categoryDropDown {
  category: categoryName;
}

interface paymentDropDown {
  status: 'expired' | 'thisWeek' | 'nextWeek';
}

interface Props extends VariantProps<typeof cvaDropDownItemBody> {
  checked?: boolean;
  isAllItems?: boolean;
  check?: () => any;
  dropdownItems: Array<categoryDropDown | employeeDropDown | paymentDropDown>;
}

const cvaDropDownItemRoot = cva([
  'flex items-center justify-between cursor-pointer whitespace-nowrap text-sm gap-1',
]);
const cvaDropDownItemTitle = cva(['flex items-center gap-1']);
const cvaDropDownItemBody = cva(['flex items-center'], {
  variants: {
    category: {
      category: 'gap-1',
      manager: 'gap-[-1rem]',
      pay: 'gap-1',
    },
  },
});

const translatePaymentStatus = (paymentStatus: paymentDropDown['status']) => {
  switch (paymentStatus) {
    case 'expired':
      return {
        title: 'Просроченые',
        body: <StageProgressCountdown dayRemains={-1} />,
      };
    case 'thisWeek':
      return {
        title: 'На этой неделе',
        body: <StageProgressCountdown dayRemains={6} />,
      };
    case 'nextWeek':
      return {
        title: 'На следующей неделе',
        body: <StageProgressCountdown dayRemains={10} />,
      };
    default:
      return {
        title: 'Просроченые',
        body: <StageProgressCountdown dayRemains={-1} />,
      };
  }
};
const completeAnimationVariants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: '-100%' },
};
const titleAnimationVariants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 1, x: -20 },
};

const tranSlateDropDownItem = (item: Props['dropdownItems'][0]) => {
  if ('name' in item && 'avatar' in item) {
    return {
      title: item.name,
      body: (
        <img
          className={
            'border-[0.2rem] border-white rounded-full w-2 aspect-square'
          }
          src={item.avatar}
        />
      ),
    };
  } else if ('status' in item) {
    return translatePaymentStatus(item.status);
  } else if ('category' in item) {
    const temp = getCategory(item.category);
    return {
      title: temp.title,
      body: (
        <div className={`w-1.5 aspect-square rounded-lg ` + temp.color}></div>
      ),
    };
  }
  return { title: '', body: <></> };
};
const DropdownItem: FC<Props> = ({
  category,
  isAllItems,
  checked,
  dropdownItems,
  check,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked ?? false);

  return (
    <div
      onClick={() => {
        setIsChecked(!isChecked);
        check ? check() : null;
      }}
      className={cvaDropDownItemRoot()}>
      <div className={cvaDropDownItemTitle()}>
        <motion.div
          animate={isChecked ? 'open' : 'closed'}
          variants={completeAnimationVariants}>
          <CompletedIcon />
        </motion.div>
        {isAllItems ? (
          <motion.p
            animate={isChecked ? 'open' : 'closed'}
            variants={titleAnimationVariants}
            transition={{ delay: isChecked ? 0 : 0.2 }}>
            Все <span>(default)</span>
          </motion.p>
        ) : (
          <motion.p
            animate={isChecked ? 'open' : 'closed'}
            variants={titleAnimationVariants}
            transition={{ delay: isChecked ? 0 : 0.2 }}>
            {tranSlateDropDownItem(dropdownItems[0]).title}
          </motion.p>
        )}
      </div>
      <div className={cvaDropDownItemBody({ category: category })}>
        {isAllItems ? (
          <>
            {dropdownItems.map((item, counter) => (
              <div key={counter}>{tranSlateDropDownItem(item).body}</div>
            ))}
          </>
        ) : (
          <div>{tranSlateDropDownItem(dropdownItems[0]).body}</div>
        )}
      </div>
    </div>
  );
};

export default DropdownItem;
