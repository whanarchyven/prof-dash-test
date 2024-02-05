import React, { useState } from 'react';
import SortDropdown, {
  SortDropdownProps,
} from '@/shared/ui/sort-dropdown/ui/index';

const SortDropDowns = () => {
  const items: SortDropdownProps['category'][] = ['category', 'manager', 'pay'];
  const [currentDropDownOpen, setCurrentDropDownOpen] = useState<number>(6);

  return (
    <>
      {items.map((item, counter) => {
        return (
          <SortDropdown
            key={counter}
            isOpen={counter == currentDropDownOpen}
            callback={() => {
              setCurrentDropDownOpen(counter);
            }}
            state={'default'}
            category={item}></SortDropdown>
        );
      })}
    </>
  );
};

export default SortDropDowns;
