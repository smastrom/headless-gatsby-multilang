import { useContext } from 'react';
import { LocaleContext } from '../components/ContextProviders/LocaleProvider';

export const usePageLocale = () => {
  const { pageLocale } = useContext(LocaleContext);

  if (!pageLocale) {
    throw new Error(
      `usePageLangauge hook cannot be called inside a template file. Call it inside of a component,
      then import the component in the template file.
      
      If you are calling this hook inside a component and getting this error, most likely
      the locale field has not been exported to the pageContext object while creating pages
      in gatsby-node.js`
    );
  }

  return { pageLocale };
};
