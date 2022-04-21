import { isRtlLang } from '../functions/localeUtils';
import { usePageLocale } from './usePageLocale';

export const useTextDirection = () => {
  const { pageLocale } = usePageLocale();

  if (!pageLocale) {
    throw new Error(
      'useTextDirection hook cannot be called inside a template file. Call it inside of a component and import it in the template file.'
    );
  }

  const isRtl = isRtlLang(pageLocale);

  return { isRtl };
};
