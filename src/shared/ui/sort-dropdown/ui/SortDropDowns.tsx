import React, { useState } from 'react';
import SortDropdown, {
  SortDropdownProps,
} from '@/shared/ui/sort-dropdown/ui/index';

const SortDropDowns = () => {
  const items: SortDropdownProps['category'][] = ['category', 'manager', 'pay'];
  const [currentDropDownOpen, setCurrentDropDownOpen] = useState<number>(0);

  return (
    <>
      {items.map((item, counter) => {
        if (counter == currentDropDownOpen) {
          return (
            <SortDropdown
              key={counter}
              isOpen
              callback={() => {
                setCurrentDropDownOpen(counter);
              }}
              state={'default'}
              category={item}></SortDropdown>
          );
        } else {
          return (
            <SortDropdown
              key={counter}
              callback={() => {
                setCurrentDropDownOpen(counter);
              }}
              state={'default'}
              category={item}></SortDropdown>
          );
        }
      })}
    </>
  );
};

export default SortDropDowns;
