import { graphql, useStaticQuery } from 'gatsby';

import { storeLocale, getLangCode } from '../../functions/localeUtils';
import { usePageId } from '../../hooks/usePageId';
import { usePageLocale } from '../../hooks/usePageLocale';
import { useLocales } from '../../hooks/useLocales';

import { Nav, List, ListItem, Link } from './styles';

export const LanguageSwitcher = () => {
  const data = useStaticQuery(graphql`
    query {
      allSitePage {
        pageNodes: nodes {
          path
          pageContext
        }
      }
      allDatoCmsBlogRoot {
        blogRootNodes: nodes {
          slug
          locale
        }
      }
    }
  `);

  const {
    allSitePage: { pageNodes },
    allDatoCmsBlogRoot: { blogRootNodes },
  } = data;

  const { pageId } = usePageId();
  const { pageLocale } = usePageLocale();
  const { defaultLocale, locales } = useLocales();

  const getPathMatch = (renderingLocale) => {
    let path;

    const pageContextMatch = pageNodes.find(
      ({ pageContext: { id, locale } }) =>
        id === pageId && locale === renderingLocale
    );

    path = pageContextMatch?.path;

    if (!path) {
      const blogPathMatch = blogRootNodes.find(
        ({ locale }) => locale === renderingLocale
      );
      const { slug: blogPathSlug, locale: blogPathLocale } = blogPathMatch;
      const isRenderingDefaultLang = blogPathLocale === defaultLocale;
      if (isRenderingDefaultLang) {
        path = `/${blogPathSlug}`;
      } else path = `/${blogPathLocale}/${blogPathSlug}`;
    }

    return path;
  };

  return (
    <Nav>
      <List>
        {locales.map((locale) =>
          locale === pageLocale ? (
            <ListItem key={locale}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link isActive as="span">
                {getLangCode(locale)}
              </Link>
            </ListItem>
          ) : (
            <ListItem key={locale}>
              <Link
                to={getPathMatch(locale)}
                onClick={() => storeLocale(locale)}
              >
                {getLangCode(locale)}
              </Link>
            </ListItem>
          )
        )}
      </List>
    </Nav>
  );
};
