import { useContext } from 'react';

import { LocaleContext } from '../components/ContextProviders/LocaleProvider';
import { formatDate } from '../functions/formatDateTime';

export const useFormattedDate = (dateString) => {
  const { pageLocale } = useContext(LocaleContext);

  const formattedDate = formatDate(dateString, pageLocale);

  return { formattedDate };
};
