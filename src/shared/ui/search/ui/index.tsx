'use client';
import { cva, VariantProps } from 'class-variance-authority';
import { FC, useState } from 'react';

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
  'p-1',
  'bg-transparent',
  'w-full',
  'text-sm',
]);

const cvaSearchButton = cva([
  'h-full',
  'aspect-square',
  'bg-cGray bg-opacity-50',
  'rounded-full',
  'flex items-center justify-center',
  'cursor-pointer',
]);

const Search: FC<Props> = ({ placeholder, mutateFunc, searchFunc, state }) => {
  const [searchState, setSearchState] = useState<typeof state>(state);
  const [query, setQuery] = useState('');

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
            searchFunc ? searchFunc(query) : alert('Значение инпута: ' + query);
          }
        }}
        className={cvaSearchInput()}
      />
      {query ? (
        <div
          onClick={() => {
            searchFunc ? searchFunc(query) : alert('Значение инпута: ' + query);
          }}
          className={cvaSearchButton()}>
          <img src={'/icons/arrow_right_white.svg'} />
        </div>
      ) : null}
    </div>
  );
};

export default Search;
