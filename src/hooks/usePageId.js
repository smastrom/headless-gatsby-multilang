import { useContext } from 'react';
import { LanguageContext } from '../components/ContextProviders/LanguageProvider';

export const usePageId = () => {
  const { id: pageId } = useContext(LanguageContext);

  if (!pageId) {
    throw new Error(
      'It seems that the originalId field has not been exported to the pageContext object while creating pages in gatsby-node.js'
    );
  }
  return { pageId };
};
