import React, { useContext } from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import styled from 'styled-components';
import { LangContext } from '../../context/langProvider';
import useLanguages from '../../hooks/useLanguages';
import { storeLocale, getLangCode } from '../../utils/misc';

// Scoped styles

const LangNavList = styled.ul`
  display: grid;
  align-items: center;
  grid-auto-flow: column;
  column-gap: var(--gapRegular);

  & li span {
    cursor: not-allowed;

    &:hover {
      color: var(--disabledColor);
    }
  }

  .activeClassLangNav {
    color: var(--primaryColor);
    &:hover {
      color: var(--primaryColor);
    }
  }

  @media screen and (max-width: 767px) {
    column-gap: 0;
  }
`;

const LangNav = styled.nav`
  text-transform: uppercase;
  &&& {
    display: grid;
    grid-template-columns: 1fr;
  }
`;

const LanguageSwitcherLink = styled(Link)`
  font-weight: 600;
  color: var(--disabledColor);
  transition: color 0.2s linear;

  &:hover {
    color: var(--primaryColor);
  }

  @media screen and (max-width: 767px) {
    padding: var(--gapSmall);
  }
`;

// Main Component

const LanguageSwitcher = () => {
  const data = useStaticQuery(graphql`
    query {
      allDatoCmsSite {
        languageNodes: nodes {
          locale
        }
      }
      allSitePage {
        pagesNodes: nodes {
          pageContext
        }
      }
      allUnavailableBlogPosts: allDatoCmsBlogPost(
        filter: { noTranslate: { eq: true } }
      ) {
        unavailableNodes: nodes {
          reference
          locale
        }
      }
    }
  `);

  const {
    allDatoCmsSite: { languageNodes },
    allSitePage: { pagesNodes },
    allUnavailableBlogPosts: { unavailableNodes },
  } = data;

  const {
    currentLanguage,
    pageType,
    archivePageNumber,
    reference: pageReference,
  } = useContext(LangContext);

  const { defaultLanguage, blogPathName } = useLanguages();

  // Boolean helpers
  const isHome = pageType === 'isHome';
  const isPage = pageType === 'isPage';
  const isArchiveRoot = pageType === 'isArchiveRoot';
  const isPaginatedArchive = pageType === 'isPaginatedArchive';
  const isPost = pageType === 'isPost';
  const isCategory = pageType === 'isCategory';

  const isPostUnavailable = (locale) =>
    unavailableNodes.some(
      ({ reference: unavReference, locale: unavLocale }) =>
        unavReference === pageReference && unavLocale === locale
    );
  const isRenderingCurrentLang = (locale) => locale === currentLanguage;
  const isRenderingDefaultLang = (locale) => locale === defaultLanguage;

  // Prop helpers
  const getCurrentLangProps = (locale) =>
    isRenderingCurrentLang(locale) && {
      className: 'activeClassLangNav',
      as: 'span',
    };

  // Path renderers for pages and posts
  const buildPagePath = (renderingLocale, contextReference) => {
    let path;
    pagesNodes
      .filter(
        ({ pageContext: { locale, pageType } }) =>
          pageType === 'isPage' && locale === renderingLocale
      )
      .some(
        ({
          pageContext: {
            locale: matchLocale,
            slug: matchSlug,
            reference: matchReference,
          },
        }) => {
          if (
            matchLocale === renderingLocale &&
            matchReference === contextReference
          ) {
            const isRenderingDefaultLang = renderingLocale === defaultLanguage;

            if (isRenderingDefaultLang) {
              path = `/${matchSlug}`;
            } else path = `/${renderingLocale}/${matchSlug}`;
          }
          return typeof path === 'string';
        }
      );
    return path;
  };

  const buildPostPath = (renderingLocale, contextReference) => {
    let path;
    pagesNodes
      .filter(
        ({ pageContext: { locale, pageType } }) =>
          pageType === 'isPost' && locale === renderingLocale
      )
      .some(
        ({
          pageContext: {
            locale: matchLocale,
            slug: matchSlug,
            reference: matchReference,
            isUncategorized,
            categorySlug,
          },
        }) => {
          if (
            matchLocale === renderingLocale &&
            matchReference === contextReference
          ) {
            const isRenderingDefaultLang = renderingLocale === defaultLanguage;

            if (isUncategorized) {
              if (isRenderingDefaultLang) {
                path = `/${blogPathName}/${matchSlug}`;
              } else path = `/${renderingLocale}/${blogPathName}/${matchSlug}`;
            } else {
              if (isRenderingDefaultLang) {
                path = `/${blogPathName}/${categorySlug}/${matchSlug}`;
              } else
                path = `/${renderingLocale}/${blogPathName}/${categorySlug}/${matchSlug}`;
            }
          }
          return typeof path === 'string';
        }
      );
    return path;
  };

  const buildCategoryPath = (renderingLocale, contextReference) => {
    let path;
    pagesNodes
      .filter(
        ({ pageContext: { locale, pageType } }) =>
          pageType === 'isCategory' && locale === renderingLocale
      )
      .some(
        ({
          pageContext: {
            locale: matchLocale,
            slug: matchSlug,
            reference: matchReference,
          },
        }) => {
          if (
            matchLocale === renderingLocale &&
            matchReference === contextReference
          ) {
            const isRenderingDefaultLang = renderingLocale === defaultLanguage;

            if (isRenderingDefaultLang) {
              path = `/${blogPathName}/${matchSlug}`;
            } else path = `/${renderingLocale}/${blogPathName}/${matchSlug}`;
          }
          return typeof path === 'string';
        }
      );
    return path;
  };

  return (
    <LangNav>
      {isHome ? (
        <LangNavList>
          {languageNodes.map(({ locale }) => (
            <li key={locale}>
              <LanguageSwitcherLink
                {...getCurrentLangProps(locale)}
                to={isRenderingDefaultLang(locale) ? '/' : `/${locale}`}
                onClick={() => storeLocale(locale)}
              >
                {getLangCode(locale)}
              </LanguageSwitcherLink>
            </li>
          ))}
        </LangNavList>
      ) : isPost ? (
        <LangNavList>
          {languageNodes.map(({ locale }) =>
            isRenderingCurrentLang(locale) ? (
              <li key={locale}>
                <LanguageSwitcherLink {...getCurrentLangProps(locale)}>
                  {getLangCode(locale)}
                </LanguageSwitcherLink>
              </li>
            ) : isPostUnavailable(locale) ? (
              <li key={locale}>
                <LanguageSwitcherLink
                  to={
                    isRenderingDefaultLang(locale)
                      ? `/${blogPathName}/`
                      : `/${locale}/${blogPathName}/`
                  }
                  onClick={() => storeLocale(locale)}
                >
                  {getLangCode(locale)}
                </LanguageSwitcherLink>
              </li>
            ) : (
              <li key={locale}>
                <LanguageSwitcherLink
                  to={buildPostPath(locale, pageReference)}
                  onClick={() => storeLocale(locale)}
                >
                  {getLangCode(locale)}
                </LanguageSwitcherLink>
              </li>
            )
          )}
        </LangNavList>
      ) : isPage ? (
        <LangNavList>
          {languageNodes.map(({ locale }) =>
            isRenderingCurrentLang(locale) ? (
              <li key={locale}>
                <LanguageSwitcherLink {...getCurrentLangProps(locale)}>
                  {getLangCode(locale)}
                </LanguageSwitcherLink>
              </li>
            ) : (
              <li key={locale}>
                <LanguageSwitcherLink
                  to={buildPagePath(locale, pageReference)}
                  onClick={() => storeLocale(locale)}
                >
                  {getLangCode(locale)}
                </LanguageSwitcherLink>
              </li>
            )
          )}
        </LangNavList>
      ) : isCategory ? (
        <LangNavList>
          {languageNodes.map(({ locale }) =>
            isRenderingCurrentLang(locale) ? (
              <li key={locale}>
                <LanguageSwitcherLink {...getCurrentLangProps(locale)}>
                  {getLangCode(locale)}
                </LanguageSwitcherLink>
              </li>
            ) : (
              <li key={locale}>
                <LanguageSwitcherLink
                  to={buildCategoryPath(locale, pageReference)}
                  onClick={() => storeLocale(locale)}
                >
                  {getLangCode(locale)}
                </LanguageSwitcherLink>
              </li>
            )
          )}
        </LangNavList>
      ) : isArchiveRoot ? (
        <LangNavList>
          {languageNodes.map(({ locale }) => (
            <li key={locale}>
              <LanguageSwitcherLink
                {...getCurrentLangProps(locale)}
                to={
                  isRenderingDefaultLang(locale)
                    ? `/${blogPathName}`
                    : `/${locale}/${blogPathName}`
                }
                onClick={() => storeLocale(locale)}
              >
                {getLangCode(locale)}
              </LanguageSwitcherLink>
            </li>
          ))}
        </LangNavList>
      ) : (
        isPaginatedArchive && (
          <LangNavList>
            {languageNodes.map(({ locale }) => (
              <li key={locale}>
                <LanguageSwitcherLink
                  {...getCurrentLangProps(locale)}
                  to={
                    isRenderingDefaultLang(locale)
                      ? `/${blogPathName}/${archivePageNumber}`
                      : `/${locale}/${blogPathName}/${archivePageNumber}`
                  }
                  onClick={() => storeLocale(locale)}
                >
                  {getLangCode(locale)}
                </LanguageSwitcherLink>
              </li>
            ))}
          </LangNavList>
        )
      )}
    </LangNav>
  );
};

export default LanguageSwitcher;
