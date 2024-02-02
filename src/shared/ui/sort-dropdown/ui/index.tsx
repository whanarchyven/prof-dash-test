'use client';
import { cva, VariantProps } from 'class-variance-authority';
import { FC, useEffect, useState } from 'react';
import ArrowDownIcon from '/public/icons/arrow_down.svg';
import DropdownItem, {
  categoryDropDown,
  dropDownCategory,
  employeeDropDown,
  paymentDropDown,
  tranSlateDropDownItem,
} from '@/shared/ui/dropdown-item/ui/DropdownItem';
import { AnimatePresence, motion } from 'framer-motion';

export interface SortDropdownProps
  extends VariantProps<typeof cvaSortContainer>,
    VariantProps<typeof cvaSortDropdownItems> {
  mutateFunc?: (arg: string) => any;
  category: dropDownCategory;
  callback?: () => any;
  isOpen?: boolean;
}

const translateDropDownCategory = (dropdownCategory: dropDownCategory) => {
  switch (dropdownCategory) {
    case 'category':
      return 'Тип проекта';
    case 'manager':
      return 'Менеджер';
    case 'pay':
      return 'Дата проекта';
  }
};

const cvaWrapper = cva(['flex justify-end']);

const cvaSortContainer = cva(
  [
    'w-fit gap-2',
    'py-0.4',
    'pl-0.4',
    'pr-1',
    'border-[0.2rem] ',
    'rounded-full',
    'flex items-center relative justify-between',
    'bg-white',
  ],
  {
    variants: {
      state: {
        default: ['border-cGrayAccent'],
        hovered: ['border-cBlack border-opacity-[0.34]'],
        typing: ['border-cBlack border-opacity-[0]'],
      },
    },
  }
);

const cvaSortDropdownTitle = cva([
  'border-transparent',
  'focus:outline-none',
  'p-0.5',
  'bg-transparent',
  'w-full',
  'text-sm',
  'text-right',
]);

const cvaSortDropDownButton = cva([
  'h-full',
  'aspect-square',
  'rounded-full',
  'flex items-center justify-center',
]);

const cvaSortDropdownItems = cva(['flex w-fit relative items-center'], {
  variants: {
    category: {
      category: 'gap-0.5',
      manager: 'gap-[-0.5rem]',
      pay: 'gap-0.5',
    },
  },
});

const cvaSortDropdownAllLabel = cva([
  'rounded-full',
  'bg-cBlack bg-opacity-50',
  'text-white lowercase text-sm',
  'p-0.5 px-1',
  'flex items-center justify-center',
]);
const cvaTitleDropDownBlock = cva([
  'flex items-center gap-1',
  'h-full',
  'whitespace-nowrap',
  'cursor-pointer',
  'pr-1',
]);

const cvaDropdownPopup = cva([
  'absolute right-0 z-[99999] top-4',
  'flex flex-col gap-2',
  'rounded-3xl',
  'shadow-xl',
  'w-fit min-w-[32rem]',
  'bg-white',
  'p-2',
]);

const dropdownPopupAnimationVariants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: '-10%' },
};

const SortDropdown: FC<SortDropdownProps> = ({
  category,
  state,
  callback,
  isOpen,
}) => {
  const [searchState, setSearchState] = useState<typeof state>(state);

  const allItems = {
    category: [
      { category: 'development' },
      { category: 'oneTimeWorks' },
      { category: 'seo' },
      { category: 'hours' },
      { category: 'tm' },
    ],
    pay: [
      { status: 'nextWeek' },
      { status: 'thisWeek' },
      { status: 'expired' },
    ],
    manager: [
      {
        name: 'Елизавета Которова',
        avatar: '/images/employees_temp/1.png',
      },
      {
        name: 'Дмитрий Голиков',
        avatar: '/images/employees_temp/2.png',
      },
      {
        name: 'Ксения Гривская',
        avatar: '/images/employees_temp/3.png',
      },
    ],
  };

  const stateInitialization: (category: dropDownCategory) => any = (
    category: dropDownCategory
  ) => {
    switch (category) {
      case 'category':
        return allItems.category;
      case 'manager':
        return allItems.manager;
      case 'pay':
        return allItems.pay;
      default:
        return allItems.pay;
    }
  };

  const [isAll, setIsAll] = useState<boolean>(true);
  const allDropdownItems = stateInitialization(category);
  const [dropdownItems, setDropDownItems] = useState<
    Array<employeeDropDown | paymentDropDown | categoryDropDown>
  >([]);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(isOpen ?? false);

  const checkDropdown = (
    item: employeeDropDown | paymentDropDown | categoryDropDown
  ) => {
    const index = dropdownItems.findIndex(
      (dropdown) =>
        tranSlateDropDownItem(dropdown).title ==
        tranSlateDropDownItem(item).title
    );
    console.log(index);
    if (index == -1) {
      setDropDownItems([...dropdownItems, item]);
    } else {
      const temp = [...dropdownItems];
      temp.splice(index, 1);
      setDropDownItems([...temp]);
    }
  };

  useEffect(() => {
    if (dropdownItems.length == 0) {
      setIsAll(true);
    }
  }, [dropdownItems]);

  useEffect(() => {
    isOpen ? setDropdownOpen(isOpen) : setDropdownOpen(false);
  }, [isOpen]);

  return (
    <div className={cvaWrapper()}>
      <div
        // onBlur={() => {
        //   setSearchState('default');
        // }}
        onMouseEnter={() => {
          setSearchState('hovered');
        }}
        onMouseLeave={() => {
          setSearchState('default');
        }}
        onClick={() => {
          setSearchState('typing');
          callback ? callback() : null;
        }}
        className={cvaSortContainer({ state: searchState })}>
        <div>
          {isAll ? (
            <div className={cvaSortDropdownAllLabel()}>Все</div>
          ) : (
            <div className={cvaSortDropdownItems({ category: category })}>
              {dropdownItems.map((item) => {
                return tranSlateDropDownItem(item).body;
              })}
            </div>
          )}
        </div>
        <div
          onClick={() => {
            setDropdownOpen(!dropdownOpen);
          }}
          className={cvaTitleDropDownBlock()}>
          <div className={cvaSortDropdownTitle()}>
            {translateDropDownCategory(category)}
          </div>
          <div onClick={() => {}} className={cvaSortDropDownButton()}>
            <ArrowDownIcon />
          </div>
        </div>
        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              variants={dropdownPopupAnimationVariants}
              initial={'closed'}
              animate={'open'}
              exit={'closed'}
              className={cvaDropdownPopup()}>
              <DropdownItem
                check={() => {
                  setDropDownItems([]);
                }}
                dropdownItems={allDropdownItems}
                checked={isAll}
                category={category}
                isAllItems={true}></DropdownItem>
              {allDropdownItems.map(
                (
                  item: employeeDropDown | paymentDropDown | categoryDropDown,
                  counter: number
                ) => {
                  return (
                    <DropdownItem
                      key={counter}
                      checked={
                        !!dropdownItems.find(
                          (dropdown) =>
                            tranSlateDropDownItem(dropdown).title ==
                            tranSlateDropDownItem(item).title
                        )
                      }
                      check={() => {
                        checkDropdown(item);
                        setIsAll(false);
                      }}
                      category={category}
                      dropdownItems={[item]}></DropdownItem>
                  );
                }
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SortDropdown;
