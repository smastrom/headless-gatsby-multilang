import { isRtlLang } from '../functions/langUtils';
import { usePageLocale } from './usePageLocale';

export const useTextDirection = () => {
  const { pageLanguage } = usePageLocale();

  if (!pageLanguage) {
    throw new Error(
      'useTextDirection hook cannot be called inside a template file. Call it inside of a component and import it in the template file.'
    );
  }

  const isRtl = isRtlLang(pageLanguage);

  return { isRtl };
};
