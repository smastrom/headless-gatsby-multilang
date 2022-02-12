import React, { useEffect, useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { Navigator } from '../../LanguageHelpers/Navigator';
import {
  easeOutTiming,
  slideFromTopAnim,
  slideFromTopExitAnim,
} from '../SharedStyles/animations';

// Scoped styles

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

// Main component

export const CategoriesDropdown = ({
  categoryNodes,
  categoryArchiveRecordId,
  seeAllCategoriesText,
  menuItemLabel,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);

  const dropdownRef = useRef();
  const dropdownLinksRef = useRef([]);
  const seeAllLinkRef = useRef();

  const closeOnOutsideClick = (e) => {
    const isContainerClicked = e.target === dropdownRef.current;
    const isSeeAllClicked = e.target === seeAllLinkRef.current;
    const areLinksClicked = dropdownLinksRef.current.some(
      (element) => e.target === element
    );

    if (!isContainerClicked && !isSeeAllClicked && !areLinksClicked) {
      setIsDropdownOpen(false);
    }
  };

  const ariaControlsId = 'categories_list';

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('click', closeOnOutsideClick);
    }
    return () => document.removeEventListener('click', closeOnOutsideClick);
  }, [isDropdownOpen]);

  return (
    <CategoriesMenuListItem>
      <CategoriesMenuListItemButton
        aria-label={menuItemLabel}
        aria-controls={ariaControlsId}
        isDropdownOpen={isDropdownOpen}
        aria-expanded={isDropdownOpen || false}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {menuItemLabel}
        <ChevronContainer isDropdownOpen={isDropdownOpen}>›</ChevronContainer>
      </CategoriesMenuListItemButton>
      <List
        id={ariaControlsId}
        isDropdownOpen={isDropdownOpen}
        ref={dropdownRef}
        onAnimationEnd={() => {
          if (isDropdownOpen === false) {
            setIsDropdownOpen(null);
          }
        }}
      >
        {categoryNodes.map(({ id, title }, index) => (
          <ListItem key={id}>
            <ListLink
              passRef={(ref) => (dropdownLinksRef.current[index] = ref)}
              recordId={id}
              activeClassName="activeClassLink"
            >
              {title}
            </ListLink>
          </ListItem>
        ))}
        <SeeAllCategories
          passRef={seeAllLinkRef}
          recordId={categoryArchiveRecordId}
        >
          {seeAllCategoriesText}
        </SeeAllCategories>
      </List>
    </CategoriesMenuListItem>
  );
};
