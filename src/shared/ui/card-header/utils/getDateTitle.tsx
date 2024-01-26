import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { cva } from 'class-variance-authority';

const cvaDateTitle = cva([
  'capitalize whitespace-nowrap font-secondary text-[1.2rem] opacity-50',
]);

export const getDateTitle = (dateStart: Date, dateEnd: Date) => {
  const isEqualMonth = dateStart.getMonth() == dateEnd.getMonth();
  const isEqualYear = dateStart.getFullYear() == dateEnd.getFullYear();
  if (isEqualMonth && isEqualYear) {
    return (
      <p className={cvaDateTitle()}>
        {format(dateStart, 'LLLL yyyy', { locale: ru })}
      </p>
    );
  } else {
    return (
      <p className={cvaDateTitle()}>
        {format(dateStart, 'LLLL yyyy', { locale: ru })} -
        <br />
        {format(dateEnd, 'LLLL yyyy', { locale: ru })}
      </p>
    );
  }
};
