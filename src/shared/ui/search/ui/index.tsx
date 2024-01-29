'use client';
import { cva, VariantProps } from 'class-variance-authority';
import { FC, useState } from 'react';
import ArrowRightIcon from '../../../../../public/icons/arrow_right.svg';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';

interface Props extends VariantProps<typeof cvaSearchContainer> {
  placeholder?: string;
  mutateFunc?: (arg: string) => any;
  searchFunc?: (arg: string) => any;
}

const cvaSearchContainer = cva(
  [
    'w-full',
    'p-0.4',
    'bg-white',
    'border-[0.2rem] hover:border-cGrayAccent',
    'rounded-full',
    'flex items-center justify-between',
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

const cvaSearchInput = cva([
  'border-transparent',
  'focus:outline-none',
  'py-0.5',
  'px-0.5',
  'bg-transparent',
  'w-full',
  'text-sm',
]);

const cvaSearchButton = cva([
  'w-3 ',
  'aspect-square',
  'bg-cGray bg-opacity-50',
  'rounded-full',
  'flex items-center justify-center',
  'cursor-pointer',
]);

const animateArrowIconVariants = {
  closed: { x: '-5%', opacity: 0 },
  open: { x: '0%', opacity: 1 },
};

const Search: FC<Props> = ({ placeholder, mutateFunc, searchFunc, state }) => {
  const [searchState, setSearchState] = useState<typeof state>(state);
  const [query, setQuery] = useState<string>('');

  return (
    <div className={cvaSearchContainer({ state: searchState })}>
      <input
        placeholder={placeholder}
        onFocus={() => {
          setSearchState('typing');
        }}
        value={query}
        onBlur={() => {
          setSearchState('default');
        }}
        onChange={(event) => {
          setQuery(event.target.value);
          mutateFunc ? mutateFunc(event.target.value) : null;
          if (query) {
            setSearchState('typing');
          }
        }}
        onKeyDown={(event) => {
          if (event.key == 'Enter') {
            searchFunc ? searchFunc(query) : null;
          }
        }}
        className={cvaSearchInput()}
      />
      <AnimatePresence>
        {query ? (
          <motion.div
            variants={animateArrowIconVariants}
            initial={'closed'}
            animate={'open'}
            exit={'closed'}
            onClick={() => {
              searchFunc ? searchFunc(query) : null;
            }}
            className={cvaSearchButton()}>
            <ArrowRightIcon className={'stroke-white'} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default Search;
