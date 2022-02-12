import { isRtlLang } from '../functions/langUtils';
import { usePageLanguage } from './usePageLanguage';

export const useTextDirection = () => {
  const { pageLanguage } = usePageLanguage();

  if (!pageLanguage) {
    throw new Error(
      'useTextDirection hook cannot be called inside a template file. Call it inside of a component and import it in the template file.'
    );
  }

  const isRtl = isRtlLang(pageLanguage);

  return { isRtl };
};
