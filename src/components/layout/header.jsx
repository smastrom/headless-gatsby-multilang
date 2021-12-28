import React, { useContext } from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import styled from 'styled-components';
import { LangContext } from '../../context/langProvider';
import LanguageSwitcher from '../langHelpers/languageSwitcher';
import useLanguages from '../../hooks/useLanguages';
import Navigator from '../langHelpers/navigator';
import MobileMenu from './mobileMenu';
import { Divider } from './sectionStyles';

// Scoped styles

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--globalPaddingLr);
  width: 100%;
  position: relative;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: var(--globalContainer);
  align-items: center;
`;

const Nav = styled.nav`
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavList = styled.ul`
  display: grid;
  grid-auto-flow: column;
  column-gap: var(--gapXL);
  & li a {
    color: var(--headingsColor);
    transition: color 0.1s linear;
    font-weight: 600;
    &:hover {
      color: var(--primaryColor);
    }
  }
`;

const HeaderRight = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  column-gap: var(--gapRegular);
  @media screen and (max-width: 768px) {
    grid-template-columns: auto auto auto;
  }
`;

const VerticalDivider = styled.span`
  height: 100%;
  width: 1px;
  display: none;
  background: var(--dividerColor);
  @media screen and (max-width: 768px) {
    display: block;
  }
`;

// Main Component

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      allDatoCmsWebsiteSetting {
        edges {
          node {
            locale
            logo {
              alt
              title
              url
            }
          }
        }
      }
      allDatoCmsMenu {
        edges {
          node {
            locale
            links {
              id: originalId
              ariaLabel
              name
              slug
              locale
            }
          }
        }
      }
    }
  `);

  const { currentLanguage } = useContext(LangContext);
  const { defaultLanguage } = useLanguages();

  const {
    allDatoCmsWebsiteSetting: { edges: settingsEdges },
    allDatoCmsMenu: { edges: menuEdges },
  } = data;

  return (
    <HeaderWrapper>
      <HeaderContainer>
        {settingsEdges
          .filter(({ node: { locale } }) => locale === currentLanguage)
          .map(
            ({
              node: {
                logo: { url, title, alt },
              },
            }) => (
              <Navigator home ariaLabel={title} key={title}>
                <img src={url} alt={alt} />
              </Navigator>
            )
          )}
        <Nav>
          <NavList>
            {menuEdges
              .filter(({ node: { locale } }) => locale === currentLanguage)
              .map(({ node: { links } }) =>
                links.map(({ id, slug, locale, ariaLabel, name }) => (
                  <li key={id}>
                    <Link
                      activeClassName="activeClassLink"
                      to={
                        locale === defaultLanguage
                          ? `/${slug}`
                          : `/${locale}/${slug}`
                      }
                      aria-label={ariaLabel}
                    >
                      {name}
                    </Link>
                  </li>
                ))
              )}
          </NavList>
        </Nav>
        <HeaderRight>
          <LanguageSwitcher />
          <VerticalDivider />
          <MobileMenu />
        </HeaderRight>
        <Divider bottom />
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default Header;
