import { useLayoutEffect, useRef, useState } from 'react';

import { useTextDirection } from '../../../../hooks/useTextDirection';
import { DarkModeToggle } from '../DarkModeToggle';
import { Hamburger } from '../Hamburger';

import {
  Wrapper,
  Nav,
  NavList,
  ListItem,
  ButtonListItem,
  ListLink,
  ListButton,
  AccordionListItem,
  AccordionListLink,
  MobileNavDivider,
  ChevronContainer,
  SeeAllCategories,
  AccordionList,
} from './styles';

const ARIA_CONTROLS_ID = 'mobile_categories_list';

export const MobileMenu = ({
  menuNodes,
  categoryNodes,
  seeAllCategoriesText,
  categoryArchiveRecordId,
  ariaLabelHamburger,
}) => {
  const accordionListRef = useRef();

  const { isRtl } = useTextDirection();

  const [isMenuOpen, setIsMenuOpen] = useState(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState({
    booleanValue: null,
    clientHeight: null,
  });

  useLayoutEffect(() => {
    if (isMenuOpen) {
      setIsAccordionOpen({
        clientHeight: accordionListRef.current.clientHeight,
        booleanValue: false,
      });
    }
  }, [isMenuOpen]);

  return (
    <Wrapper>
      <Hamburger
        ariaLabel={ariaLabelHamburger}
        isOpen={isMenuOpen}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      />
      <Nav
        isRtl={isRtl}
        isMenuOpen={isMenuOpen}
        onAnimationEnd={() => {
          if (isMenuOpen === false) {
            setIsMenuOpen(null);
            setIsAccordionOpen({
              clientHeight: 0,
              booleanValue: null,
            });
          }
        }}
      >
        <NavList>
          <ButtonListItem>
            <DarkModeToggle />
          </ButtonListItem>
          {menuNodes.map(({ links }) =>
            links.map(({ id, name, isCategoryDropdown, link }, index) =>
              isCategoryDropdown ? (
                <ListItem key={id}>
                  <ListButton
                    as="button"
                    aria-controls={ARIA_CONTROLS_ID}
                    aria-expanded={isAccordionOpen.booleanValue || false}
                    isAccordionOpen={isAccordionOpen.booleanValue}
                    onClick={() =>
                      setIsAccordionOpen({
                        ...isAccordionOpen,
                        booleanValue: !isAccordionOpen.booleanValue,
                      })
                    }
                  >
                    {name}
                    <ChevronContainer
                      isAccordionOpen={isAccordionOpen.booleanValue}
                    >
                      ›
                    </ChevronContainer>
                  </ListButton>
                  <AccordionList
                    id={ARIA_CONTROLS_ID}
                    clientHeight={isAccordionOpen.clientHeight}
                    isAccordionOpen={isAccordionOpen.booleanValue}
                    ref={accordionListRef}
                  >
                    {categoryNodes.map(({ id: categoryId, title }) => (
                      <AccordionListItem key={categoryId}>
                        <AccordionListLink
                          recordId={categoryId}
                          activeClassName="activeClassLink"
                        >
                          {title}
                        </AccordionListLink>
                      </AccordionListItem>
                    ))}
                    <SeeAllCategories recordId={categoryArchiveRecordId}>
                      {seeAllCategoriesText}
                    </SeeAllCategories>
                  </AccordionList>
                  {links.length - 1 !== index && (
                    <MobileNavDivider key={`div_${id}`} isRtl={isRtl} />
                  )}
                </ListItem>
              ) : (
                <ListItem key={id}>
                  <ListLink
                    activeClassName="activeClassLink"
                    recordId={link?.id}
                  >
                    {name}
                  </ListLink>
                  {links.length - 1 !== index && (
                    <MobileNavDivider key={`div_${id}`} isRtl={isRtl} />
                  )}
                </ListItem>
              )
            )
          )}
        </NavList>
      </Nav>
    </Wrapper>
  );
};
