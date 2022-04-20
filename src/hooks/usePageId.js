import { useContext } from 'react';
import { LocaleContext } from '../components/ContextProviders/LocaleProvider';

export const usePageId = () => {
  const { id: pageId } = useContext(LocaleContext);

  if (!pageId) {
    throw new Error(
      'It seems that the originalId field has not been exported to the pageContext object while creating pages in gatsby-node.js'
    );
  }
  return { pageId };
};
