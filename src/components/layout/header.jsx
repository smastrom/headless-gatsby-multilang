import React, { useContext, useEffect, useRef, useState } from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import styled from 'styled-components';
import { LangContext } from '../../context/langProvider';
import LanguageSwitcher from '../langHelpers/languageSwitcher';
import useLanguages from '../../hooks/useLanguages';
import Navigator from '../langHelpers/navigator';
import MobileMenu from './mobileMenu';
import { Divider } from './sectionStyles';
import HeaderDropdown from './headerDropdown';
import { easeOutTiming } from './animations';
import DarkModeToggle from '../ui/DarkModeToggle';

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
  grid-auto-flow: column;
  column-gap: var(--gapRegular);
  @media screen and (max-width: 768px) {
    grid-template-columns: auto auto auto;
  }
`;

const VerticalDivider = styled.span`
  height: 100%;
  width: 1px;
  background: var(--dividerColor);
  display: ${({ hideOnDesktop }) => (hideOnDesktop ? 'none' : 'block')};

  @media screen and (max-width: 768px) {
    display: ${({ hideOnMobile }) => (hideOnMobile ? 'none' : 'block')};
  }
`;

const CategoryMenuItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;
`;

const CategoryMenuItemButton = styled.button`
  cursor: pointer;
  border: none;
  background: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  transition: color ${easeOutTiming};
  color: ${({ isDropdownOpen }) =>
    isDropdownOpen ? 'var(--primaryColor)' : 'var(--headingsColor)'};
`;

const ChevronContainer = styled.span`
  font-size: var(--baseXL);
  display: flex;
  max-height: 0;
  color: ${({ isDropdownOpen }) => isDropdownOpen && 'var(--primaryColor)'};
  align-items: center;
  margin-left: var(--gapSmall);
  transition: transform ${easeOutTiming}, color ${easeOutTiming};
  transform: ${({ isDropdownOpen }) =>
    isDropdownOpen ? 'scaleX(-1) rotate(-90deg)' : 'rotate(90deg)'};
`;

// Main Component

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      allDatoCmsWebsiteSetting {
        settingsEdges: edges {
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
        menuEdges: edges {
          node {
            locale
            links {
              id: originalId
              ariaLabel
              name
              slug
              locale
              isCategoryDropdown
            }
          }
        }
      }
      allDatoCmsCategory {
        categoryNodes: nodes {
          id: originalId
          title
          slug
          locale
        }
      }
    }
  `);

  const {
    allDatoCmsWebsiteSetting: { settingsEdges },
    allDatoCmsMenu: { menuEdges },
    allDatoCmsCategory: { categoryNodes },
  } = data;

  const { currentLanguage } = useContext(LangContext);
  const { defaultLanguage } = useLanguages();

  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const dropdownRef = useRef(null);
  const dropdownLinksRef = useRef([]);

  const closeOnOutsideClick = (e) => {
    const isContainerClicked = e.target === dropdownRef.current;
    const areLinksClicked = dropdownLinksRef.current.some(
      (element) => e.target === element
    );
    if (!isContainerClicked && !areLinksClicked) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('click', closeOnOutsideClick);
    }
    return () => document.removeEventListener('click', closeOnOutsideClick);
  }, [isDropdownOpen]);

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
                links.map(
                  ({ id, slug, locale, ariaLabel, name, isCategoryDropdown }) =>
                    isCategoryDropdown ? (
                      <CategoryMenuItem>
                        <CategoryMenuItemButton
                          aria-label={ariaLabel}
                          aria-controls="categories_list"
                          isDropdownOpen={isDropdownOpen}
                          aria-expanded={isDropdownOpen ? true : false}
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                          {name}
                          <ChevronContainer
                            aria-hidden="true"
                            isDropdownOpen={isDropdownOpen}
                          >
                            ›
                          </ChevronContainer>
                        </CategoryMenuItemButton>
                        <HeaderDropdown
                          ariaControlsTargetID="categories_list"
                          contextLocale={currentLanguage}
                          state={isDropdownOpen}
                          setState={setIsDropdownOpen}
                          containerRef={dropdownRef}
                          listItemsRefs={dropdownLinksRef}
                          nodesArray={categoryNodes}
                        />
                      </CategoryMenuItem>
                    ) : (
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
                    )
                )
              )}
          </NavList>
        </Nav>

        <HeaderRight>
          <DarkModeToggle />
          <VerticalDivider hideOnMobile />
          <LanguageSwitcher />
          <VerticalDivider hideOnDesktop />
          <MobileMenu />
        </HeaderRight>
        <Divider bottom />
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default Header;
