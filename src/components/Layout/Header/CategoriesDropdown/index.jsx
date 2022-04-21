import { useEffect, useState, useRef } from 'react';

import {
  CategoriesMenuListItem,
  CategoriesMenuListItemButton,
  ChevronContainer,
  List,
  ListItem,
  ListLink,
  SeeAllCategories,
} from './styles';

const ARIA_CONTROLS_ID = 'categories_list';

export const CategoriesDropdown = ({
  categoryNodes,
  categoryArchiveRecordId,
  seeAllCategoriesText,
  menuItemLabel,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);

  const dropdownButtonRef = useRef();
  const dropdownRef = useRef();
  const dropdownLinksRef = useRef([]);
  const seeAllLinkRef = useRef();

  const closeOnOutsideClick = (e) => {
    const isButtonClicked = e.target === dropdownButtonRef.current;
    const isContainerClicked = e.target === dropdownRef.current;
    const isSeeAllClicked = e.target === seeAllLinkRef.current;
    const areLinksClicked = dropdownLinksRef.current.some(
      (element) => e.target === element
    );

    if (
      !isButtonClicked &&
      !isContainerClicked &&
      !isSeeAllClicked &&
      !areLinksClicked
    ) {
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
    <CategoriesMenuListItem>
      <CategoriesMenuListItemButton
        ref={dropdownButtonRef}
        aria-label={menuItemLabel}
        aria-controls={ARIA_CONTROLS_ID}
        isDropdownOpen={isDropdownOpen}
        aria-expanded={isDropdownOpen || false}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {menuItemLabel}
        <ChevronContainer isDropdownOpen={isDropdownOpen}>›</ChevronContainer>
      </CategoriesMenuListItemButton>
      <List
        id={ARIA_CONTROLS_ID}
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
              // eslint-disable-next-line no-return-assign
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
