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
        siteNodes: nodes {
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
    allDatoCmsSite: { siteNodes },
    allSitePage: { pagesNodes },
    allUnavailableBlogPosts: { unavailableNodes },
  } = data;

  const {
    currentLanguage,
    pageType,
    archivePageNumber,
    reference: pageReference,
  } = useContext(LangContext);

  const { defaultLanguage, blogPath } = useLanguages();

  // Boolean helpers
  const isHome = pageType === 'isHome';
  const isPage = pageType === 'isPage';
  const isArchiveRoot = pageType === 'isArchiveRoot';
  const isPaginatedArchive = pageType === 'isPaginatedArchive';
  const isPost = pageType === 'isPost';

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

  // Slug renderer for pages and posts
  const renderMatchingSlug = (locale, reference) =>
    pagesNodes.map(
      ({
        pageContext: {
          locale: matchLocale,
          slug: matchSlug,
          reference: matchReference,
          isUncategorized,
          categorySlug,
        },
      }) =>
        matchLocale === locale &&
        matchReference === reference && (
          <li key={locale}>
            <LanguageSwitcherLink
              to={
                isPost && isUncategorized
                  ? locale === defaultLanguage
                    ? `/${blogPath}/${matchSlug}`
                    : `/${locale}/${blogPath}/${matchSlug}`
                  : isPost && !isUncategorized
                  ? locale === defaultLanguage
                    ? `/${blogPath}/${categorySlug}/${matchSlug}`
                    : `/${locale}/${blogPath}/${categorySlug}/${matchSlug}`
                  : isPage
                  ? locale === defaultLanguage
                    ? `/${matchSlug}`
                    : `/${locale}/${matchSlug}`
                  : '/'
              }
              onClick={() => storeLocale(locale)}
            >
              {getLangCode(locale)}
            </LanguageSwitcherLink>
          </li>
        )
    );

  return (
    <LangNav>
      {isHome ? (
        <LangNavList>
          {siteNodes.map(({ locale }) => (
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
      ) : isArchiveRoot ? (
        <LangNavList>
          {siteNodes.map(({ locale }) => (
            <li key={locale}>
              <LanguageSwitcherLink
                {...getCurrentLangProps(locale)}
                to={
                  isRenderingDefaultLang(locale)
                    ? `/${blogPath}`
                    : `/${locale}/${blogPath}`
                }
                onClick={() => storeLocale(locale)}
              >
                {getLangCode(locale)}
              </LanguageSwitcherLink>
            </li>
          ))}
        </LangNavList>
      ) : isPaginatedArchive ? (
        <LangNavList>
          {siteNodes.map(({ locale }) => (
            <li key={locale}>
              <LanguageSwitcherLink
                {...getCurrentLangProps(locale)}
                to={
                  isRenderingDefaultLang(locale)
                    ? `/${blogPath}/${archivePageNumber}`
                    : `/${locale}/${blogPath}/${archivePageNumber}`
                }
                onClick={() => storeLocale(locale)}
              >
                {getLangCode(locale)}
              </LanguageSwitcherLink>
            </li>
          ))}
        </LangNavList>
      ) : (
        (isPost || isPage) && (
          <LangNavList>
            {siteNodes.map(({ locale }) =>
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
                      isPost && isRenderingDefaultLang(locale)
                        ? `/${blogPath}/`
                        : `/${locale}/${blogPath}/`
                    }
                    onClick={() => storeLocale(locale)}
                  >
                    {getLangCode(locale)}
                  </LanguageSwitcherLink>
                </li>
              ) : (
                renderMatchingSlug(locale, pageReference)
              )
            )}
          </LangNavList>
        )
      )}
    </LangNav>
  );
};

export default LanguageSwitcher;
