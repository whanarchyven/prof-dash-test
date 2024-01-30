import { cva, VariantProps } from 'class-variance-authority';
import { FC } from 'react';

interface Props extends VariantProps<typeof cvaCategory> {}

export type categoryName = Props['category'];

export const categoriesTitle = () => {
  const categories: Map<Props['category'], string> = new Map();
  categories.set('development', 'Разработка сайта');
  categories.set('oneTimeWorks', 'Разовые работы');
  categories.set('tm', 'T&M');
  categories.set('hours', 'Пакет часов');
  categories.set('seo', 'SEO');
  return categories;
};

export const categoriesColor = () => {
  const categories: Map<Props['category'], string> = new Map();
  categories.set('development', 'text-cPurple bg-cPurple');
  categories.set('oneTimeWorks', 'text-cGreenAccent bg-cGreenAccent');
  categories.set('tm', 'text-cRedAccent bg-cRedAccent');
  categories.set('hours', 'text-cBlue bg-cBlue');
  categories.set('seo', 'text-cPinkAccent bg-cPinkAccent');
  return categories;
};

export const getCategory = (category: Props['category']) => {
  return {
    id: category,
    title: categoriesTitle().get(category),
    color: categoriesColor().get(category),
  };
};

const cvaCategory = cva(
  [
    'text-sm whitespace-nowrap font-base',
    'p-0.5',
    'rounded-2xl border-2',
    'w-fit',
  ],
  {
    variants: {
      category: {
        development: 'border-cPurple text-cPurple',
        oneTimeWorks: 'border-cGreenAccent text-cGreenAccent',
        tm: 'border-cRedAccent text-cRedAccent',
        hours: 'border-cBlue text-cBlue',
        seo: 'border-cPinkAccent text-cPinkAccent',
      },
    },
  }
);
const Category: FC<Props> = ({ category }) => {
  const categoryInfo = getCategory(category);
  return (
    <div className={cvaCategory({ category: category })}>
      {categoryInfo.title}
    </div>
  );
};

export default Category;
