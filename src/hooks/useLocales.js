import { graphql, useStaticQuery } from 'gatsby';

/**
 * The query returns the array of the project available languages, sorted in the same order
 * as set on DatoCMS.
 *
 * Since the first array item is always the default locale, we destructure it
 * use it as an helper to render page paths
 */

export const useLocales = () => {
  const data = useStaticQuery(graphql`
    query {
      datoCmsSite {
        locales
      }
    }
  `);

  const {
    datoCmsSite: { locales },
  } = data;

  const [defaultLocale] = locales;

  return { locales, defaultLocale };
};
