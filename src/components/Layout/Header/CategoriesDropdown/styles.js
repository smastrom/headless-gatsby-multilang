import styled, { css } from 'styled-components';

import { Navigator } from '../../../Navigator';
import {
  easeOutTiming,
  slideFromTopAnim,
  slideFromTopExitAnim,
} from '../../sharedStyles/animationStyles';

const CategoriesMenuListItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;
`;

const CategoriesMenuListItemButton = styled.button`
  cursor: pointer;
  border: none;
  background: none;
  font-weight: 600;
  display: grid;
  column-gap: var(--gapSmall);
  grid-template-columns: min-content auto;
  align-items: center;
  transition: color ${easeOutTiming};
  color: ${({ isDropdownOpen }) =>
    isDropdownOpen ? 'var(--primaryColor)' : 'var(--headingsColor)'};
`;

const ChevronContainer = styled.span`
  font-size: var(--baseXL);
  display: flex;
  max-height: 0;
  pointer-events: none;
  color: ${({ isDropdownOpen }) => isDropdownOpen && 'var(--primaryColor)'};
  align-items: center;
  transition: transform ${easeOutTiming}, color ${easeOutTiming};
  transform: ${({ isDropdownOpen }) =>
    isDropdownOpen ? 'scaleX(-1) rotate(-90deg)' : 'rotate(90deg)'};
`;

const List = styled.ul`
  position: absolute;
  top: 2.5em;
  z-index: 2;
  right: 0;
  min-width: 220px;
  display: grid;
  grid-auto-flow: row;
  padding: var(--gapSmall) 0;
  background: var(--backgroundColorAlt);
  border-radius: 20px;
  border: var(--borderRegular) solid var(--dividerColor);
  height: auto;

  ${({ isDropdownOpen }) => {
    switch (isDropdownOpen) {
      case null: {
        return css`
          display: none;
        `;
      }
      case false: {
        return css`
          animation: ${slideFromTopExitAnim} ${easeOutTiming} forwards;
        `;
      }
      case true: {
        return css`
          animation: ${slideFromTopAnim} ${easeOutTiming} forwards;
        `;
      }
      default:
        return null;
    }
  }}
`;

const commonDropdownLinkPadding = 'var(--gapSmall) var(--gapRegular)';

const ListItem = styled.li`
  display: flex;
  width: 100%;
`;

const ListLink = styled(Navigator)`
  padding: ${commonDropdownLinkPadding};
  width: 100%;
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

export {
  CategoriesMenuListItem,
  CategoriesMenuListItemButton,
  ChevronContainer,
  List,
  ListItem,
  ListLink,
  SeeAllCategories,
};
