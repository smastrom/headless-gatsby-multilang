import { useStaticQuery, graphql } from 'gatsby';
import { usePageLocale } from './usePageLocale';

export const usePathMatch = (recordId) => {
  if (!recordId) {
    throw new Error(
      'usePageMatch hook requires a recordId to be passed as parameter'
    );
  }

  const data = useStaticQuery(graphql`
    query {
      allSitePage {
        pageNodes: nodes {
          path
          pageContext
        }
      }
    }
  `);

  const {
    allSitePage: { pageNodes },
  } = data;

  const { pageLocale } = usePageLocale();

  const pathMatch = pageNodes.find(
    ({ pageContext: { id, locale } }) =>
      id === recordId && locale === pageLocale
  );

  if (!pathMatch) {
    throw new Error(
      `No page for the provided recordId ${recordId} has been generated for ${pageLocale} locale.

      Please refer to the "Troubleshooting" section of the README.`
    );
  }

  const { path } = pathMatch;

  return { path };
};
