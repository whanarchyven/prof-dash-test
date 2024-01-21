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

interface Props
  extends VariantProps<typeof cvaSortContainer>,
    VariantProps<typeof cvaSortDropdownItems> {
  mutateFunc?: (arg: string) => any;
  category: dropDownCategory;
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
    'bg-white',
    'border-[0.2rem] hover:border-cGrayAccent',
    'rounded-full',
    'flex items-center relative justify-between',
  ],
  {
    variants: {
      state: {
        default: ['border-transparent'],
        hovered: ['border-cGrayAccent'],
        typing: ['border-cGrayAccent'],
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
  'rounded-full bg-cBlack bg-opacity-50 text-white p-0.5 px-1 flex items-center justify-center lowercase text-sm',
]);
const cvaTitleDropDownBlock = cva([
  'flex items-center h-full whitespace-nowrap cursor-pointer gap-1 pr-1',
]);

const cvaDropdownPopup = cva([
  'absolute right-0 z-50 top-4 flex flex-col gap-2 rounded-3xl shadow-xl w-[32rem] bg-white p-2',
]);

const dropdownPopupAnimationVariants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: '-10%' },
};

const SortDropdown: FC<Props> = ({ category, state }) => {
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

  const [isAll, setIsAll] = useState(true);
  const allDropdownItems = stateInitialization(category);
  const [dropdownItems, setDropDownItems] = useState<
    Array<employeeDropDown | paymentDropDown | categoryDropDown>
  >([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  return (
    <div className={cvaWrapper()}>
      <div
        onBlur={() => {
          setSearchState('default');
        }}
        onClick={() => {
          setSearchState('hovered');
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
            <ArrowDownIcon></ArrowDownIcon>
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
