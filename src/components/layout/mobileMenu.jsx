import React, { useState, useContext, Fragment } from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import styled, { css } from 'styled-components';
import Hamburger from '../ui/hamburger';
import { LangContext } from '../../context/langProvider';
import useLanguages from '../../hooks/useLanguages';

// Scoped styles

const MobileMenuWrapper = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const MobileMenuNav = styled.nav`
  width: 200px;
  border-radius: var(--defaultRadius);
  border: 2px solid var(--primaryColor);
  position: absolute;
  right: var(--globalPaddingLr);
  top: calc(var(--globalPaddingLr) * 3);
  background: white;
  display: none;
  padding: var(--gapSmall) 0;
  transition: 0.2s opacity ease-in-out;
  z-index: 1;

  ${({ isOpen }) =>
    isOpen &&
    css`
      display: block;
    `}
`;

const MobileMenuNavList = styled.ul`
  display: grid;
  justify-items: center;

  & li {
    display: flex;
    width: 100%;
    flex-direction: column;
  }

  & li a {
    padding: var(--gapSmall) var(--gapRegular);
    width: 100%;
    color: var(--headingsColor);
    font-size: var(--baseL);
    text-align: left;
    font-weight: 600;
  }
`;

const MobileNavDivider = styled.span`
  height: 1px;
  background: var(--dividerColor);
  width: calc(100% - calc(var(--gapRegular) * 2));
  left: var(--gapRegular);
  position: relative;
`;

// Main Component

const MobileMenu = () => {
  const data = useStaticQuery(graphql`
    query {
      allDatoCmsMenu {
        nodes {
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
  `);

  const { currentLanguage } = useContext(LangContext);
  const { defaultLanguage } = useLanguages();

  const [isOpen, setIsOpen] = useState(false);

  const {
    allDatoCmsMenu: { nodes: menuNodes },
  } = data;

  return (
    <MobileMenuWrapper>
      <Hamburger isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <MobileMenuNav isOpen={isOpen} aria-hidden={!isOpen || false}>
        <MobileMenuNavList>
          {menuNodes
            .filter(({ locale }) => locale === currentLanguage)
            .map(({ links }) =>
              links.map(({ id, locale, slug, ariaLabel, name }, index) => (
                <Fragment key={id}>
                  <li>
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
                    {links.length - 1 !== index && (
                      <MobileNavDivider key={`div_${slug}`} />
                    )}
                  </li>
                </Fragment>
              ))
            )}
        </MobileMenuNavList>
      </MobileMenuNav>
    </MobileMenuWrapper>
  );
};

export default MobileMenu;
