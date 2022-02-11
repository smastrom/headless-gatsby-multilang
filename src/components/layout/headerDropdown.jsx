import React from 'react';
import Navigator from '../langHelpers/navigator';
import styled, { css } from 'styled-components';
import {
  cleanCssAnim,
  easeOutTiming,
  slideFromTopAnim,
  slideFromTopExitAnim,
} from './animations';

// Scoped styles

const CategoriesList = styled.ul`
  position: absolute;
  top: 2.5em;
  z-index: 2;
  right: 0;
  min-width: 220px;
  display: grid;
  grid-auto-flow: row;
  padding: var(--gapSmall) 0;
  background: white;
  border-radius: 20px;
  border: 2px solid var(--dividerColor);
  height: min-content;
  display: ${({ state }) => state === null && 'none'};
  animation: ${({ state }) =>
    css`
      ${state
        ? slideFromTopAnim
        : state === false && slideFromTopExitAnim} ${easeOutTiming} forwards
    `};
`;

const commonDropdownLinkPadding = `var(--gapSmall) var(--gapRegular)`;

const CategoryLink = styled(Navigator)`
  padding: ${commonDropdownLinkPadding};
`;

const SeeAllCategories = styled(Navigator)`
  margin-top: var(--gapSmall);
  color: var(--primaryColor) !important;
  font-size: var(--baseS);
  padding: ${commonDropdownLinkPadding};

  @media (hover: hover) {
    &:hover {
      text-decoration: underline;
    }
  }
`;

// Main component

const HeaderDropdown = ({
  contextLocale,
  containerRef,
  listItemsRefs,
  state,
  setState,
  nodesArray,
  ariaControlsTargetID,
}) => (
  <CategoriesList
    id={ariaControlsTargetID}
    state={state}
    ref={containerRef}
    onAnimationEnd={() => cleanCssAnim(state, setState)}
  >
    {nodesArray
      .filter(({ locale }) => locale === contextLocale)
      .slice(0, 6)
      .map(({ id, title, slug }, index) => (
        <CategoryLink
          key={id}
          category
          categorySlug={slug}
          activeClassName="activeClassLink"
          ref={(ref) => (listItemsRefs.current[index] = ref)}
        >
          {title}
        </CategoryLink>
      ))}
    <SeeAllCategories to="/">See all categories →</SeeAllCategories>
  </CategoriesList>
);

export default HeaderDropdown;
