export const isFirstUnfinishedProjectType = (categories: string[]) => {
  return (
    categories.includes('T&M') ||
    categories.includes('Пакет часов') ||
    categories.includes('SEO')
  );
};
