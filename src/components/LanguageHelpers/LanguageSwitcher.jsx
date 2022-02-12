import React from 'react';
import { graphql, useStaticQuery, Link as GatsbyLink } from 'gatsby';
import styled, { css } from 'styled-components';
import { storeLocale, getLangCode } from '../../functions/langUtils';
import { usePageId } from '../../hooks/usePageId';
import { usePageLanguage } from '../../hooks/usePageLanguage';
import { useDefaultLanguage } from '../../hooks/useDefaultLanguage';

// Scoped styles

const Nav = styled.nav`
  display: grid;
`;

const List = styled.ul`
  display: grid;
  align-items: center;
  grid-auto-flow: column;
  column-gap: var(--gapRegular);

  @media screen and (max-width: 767px) {
    column-gap: 0;
  }
`;

const ListItem = styled.li`
  & span {
    cursor: not-allowed;
    color: var(--primaryColor);
  }
`;

const Link = styled(GatsbyLink)`
  font-weight: 600;
  color: var(--baseTextColor);
  transition: color 0.2s linear;
  text-transform: uppercase;

  @media (hover: hover) {
    &:hover {
      color: var(--primaryColor);
    }
  }

  @media screen and (max-width: 767px) {
    padding: var(--gapSmall);
  }

  ${({ isActive }) =>
    isActive &&
    css`
      color: var(--primaryColor);
      @media (hover: hover) {
        &:hover {
          color: var(--primaryColor);
        }
      }
    `}
`;

// Main component

export const LanguageSwitcher = () => {
  const data = useStaticQuery(graphql`
    query {
      allDatoCmsSite {
        languageNodes: nodes {
          locale
        }
      }
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
    allDatoCmsSite: { languageNodes },
    allSitePage: { pageNodes },
    allDatoCmsBlogRoot: { blogRootNodes },
  } = data;

  const { pageId } = usePageId();
  const { pageLanguage } = usePageLanguage();
  const { defaultLanguage } = useDefaultLanguage();

  const isRenderingCurrentLang = (renderingLocale) =>
    renderingLocale === pageLanguage;

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
      const isRenderingDefaultLang = blogPathLocale === defaultLanguage;
      if (isRenderingDefaultLang) {
        path = `/${blogPathSlug}`;
      } else path = `/${blogPathLocale}/${blogPathSlug}`;
    }

    return path;
  };

  return (
    <Nav>
      <List>
        {languageNodes.map(({ locale }) =>
          isRenderingCurrentLang(locale) ? (
            <ListItem key={locale}>
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
