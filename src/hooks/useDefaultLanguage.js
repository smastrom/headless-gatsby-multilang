import { graphql, useStaticQuery } from 'gatsby';

/**
 * The query returns the array of the project available languages, sorted in the same order
 * as set on DatoCMS.
 *
 * Since the first array item is always the default language, we destructure it
 * and we will use it as an helper to render page paths
 */

export const useDefaultLanguage = () => {
  const data = useStaticQuery(
    graphql`
      query {
        datoCmsSite {
          locales
        }
      }
    `
  );

  const {
    datoCmsSite: { locales },
  } = data;

  const [defaultLanguage] = locales;

  return { defaultLanguage };
};
