import React, { useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import { LangContext } from '../../context/langProvider';
import Navigator from '../langHelpers/navigator';

// Scoped styles

const MenuWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 860px) {
    padding: 0 var(--globalPaddingLr);
  }
`;

const divider = `1px solid var(--dividerColor);`;

const ScrollGradientContainer = styled.div`
  --scrollBarHeight: 6px;
  position: relative;
  margin-bottom: var(--gapXL);
  width: var(--globalContainer);
  padding-bottom: 2px;
  border-top: ${divider};
  border-bottom: ${divider};

  &::after {
    position: absolute;
    content: '';
    width: var(--gapXL);
    background: linear-gradient(
      to right,
      var(--transparent) 25%,
      var(--background) 75%
    );
    z-index: 2;
    display: block;
    height: calc(100% - calc(var(--scrollBarHeight) * 2));
    right: 0;
    top: 0;
  }

  @media screen and (max-width: 1100px) {
    width: 100%;
  }
`;

const NavContainer = styled.nav`
  width: var(--globalContainer);
  padding: var(--gapRegular) 0
    calc(var(--gapRegular) - calc(var(--scrollBarHeight) / 2)) 0;
  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--dividerColor) var(--transparent);

  &::-webkit-scrollbar {
    height: var(--scrollBarHeight);
  }

  &::-webkit-scrollbar-track {
    background: white;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--dividerColor);
    border-radius: var(--scrollBarHeight);
    border: none;
  }

  @media screen and (max-width: 1100px) {
    width: 100%;
  }
`;

const NavList = styled.ul`
  display: grid;
  grid-auto-flow: column;
  width: min-content;
  column-gap: var(--gapXL);

  & li:last-of-type > a {
    z-index: 3;
  }
`;

const CategoryLink = styled(Navigator)`
  color: var(--headingsColor);
  font-weight: 600;
  white-space: nowrap;
  position: relative;

  @media (hover: hover) {
    &:hover {
      color: var(--primaryColor);
    }
  }
`;

// Main component

const CategoriesMenu = () => {
  const data = useStaticQuery(graphql`
    {
      allDatoCmsCategory {
        categoryNodes: nodes {
          id: originalId
          locale
          title
          slug
        }
      }
    }
  `);

  const {
    allDatoCmsCategory: { categoryNodes },
  } = data;

  const { currentLanguage } = useContext(LangContext);

  return (
    <MenuWrapper>
      <ScrollGradientContainer>
        <NavContainer>
          <NavList>
            {categoryNodes
              .filter(({ locale }) => locale === currentLanguage)
              .map(({ id, title, slug }) => (
                <li>
                  <CategoryLink
                    key={id}
                    activeStyle={{
                      gridColumn: 1,
                    }}
                    activeClassName="activeClassLink"
                    category
                    categorySlug={slug}
                  >
                    {title}
                  </CategoryLink>
                </li>
              ))}
            <li>
              <CategoryLink activeClassName="activeCategoryMenuClassLink">
                Raffaele Rubrante
              </CategoryLink>
            </li>
            <li>
              <CategoryLink activeClassName="activeCategoryMenuClassLink">
                Raffaele Rubrante
              </CategoryLink>
            </li>
            <li>
              <CategoryLink activeClassName="activeCategoryMenuClassLink">
                Raffaele Rubrante
              </CategoryLink>
            </li>
            <li>
              <CategoryLink activeClassName="activeCategoryMenuClassLink">
                Raffaele Rubrante
              </CategoryLink>
            </li>
            <li>
              <CategoryLink activeClassName="activeCategoryMenuClassLink">
                Raffaele Rubrante
              </CategoryLink>
            </li>
            <li>
              <CategoryLink activeClassName="activeCategoryMenuClassLink">
                Raffaele Rubrante
              </CategoryLink>
            </li>
            <li>
              <CategoryLink activeClassName="activeCategoryMenuClassLink">
                Raffaele Rubrante
              </CategoryLink>
            </li>
            <li>
              <CategoryLink activeClassName="activeCategoryMenuClassLink">
                Raffaele Rubrante
              </CategoryLink>
            </li>
            <li>
              <CategoryLink activeClassName="activeCategoryMenuClassLink">
                Raffaele Rubrante
              </CategoryLink>
            </li>
            <li>
              <CategoryLink activeClassName="activeCategoryMenuClassLink">
                Raffaele Rubrante
              </CategoryLink>
            </li>
            <li>
              <CategoryLink activeClassName="activeCategoryMenuClassLink">
                Raffaele Rubrante
              </CategoryLink>
            </li>
          </NavList>
        </NavContainer>
      </ScrollGradientContainer>
    </MenuWrapper>
  );
};

export default CategoriesMenu;
