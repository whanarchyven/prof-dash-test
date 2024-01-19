import { cva, VariantProps } from 'class-variance-authority';
import { FC } from 'react';

interface Props extends VariantProps<typeof cvaCategory> {}

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
  categories.set('development', 'cPurple');
  categories.set('oneTimeWorks', 'cGreenAccent');
  categories.set('tm', 'cRedAccent');
  categories.set('hours', 'cBlue');
  categories.set('seo', 'cPinkAccent');
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
  ['text-sm p-0.5 rounded-2xl whitespace-nowrap border-2 w-fit font-base'],
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
