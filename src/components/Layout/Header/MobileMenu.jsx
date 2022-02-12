import React, { useLayoutEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { Hamburger } from './Hamburger';
import { Navigator } from '../../LanguageHelpers/Navigator';
import { DarkModeToggle } from './DarkModeToggle';
import {
  easeOutTiming,
  slideFromTopAnim,
  slideFromTopExitAnim,
} from '../SharedStyles/animations';
import { useTextDirection } from '../../../hooks/useTextDirection';

// Scoped styles

const Wrapper = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const Nav = styled.nav`
  width: 280px;
  border-radius: var(--defaultRadius);
  border: var(--borderRegular) solid var(--primaryColor);
  position: absolute;
  top: calc(var(--globalPaddingLr) * 3);
  background: var(--backgroundColorAlt);
  padding: var(--gapSmall) 0;
  transition: opacity ${easeOutTiming};
  z-index: 5;

  ${({ isRtl }) => {
    if (isRtl) {
      return css`
        left: var(--globalPaddingLr);
      `;
    }
    return css`
      right: var(--globalPaddingLr);
    `;
  }}

  ${({ isMenuOpen }) => {
    switch (isMenuOpen) {
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
  }};

  @media screen and (max-width: 480px) {
    max-width: calc(100vw - calc(var(--globalPaddingLr) * 2));
  }
`;

const NavList = styled.ul`
  display: grid;
  justify-items: center;
`;

const ListItem = styled.li`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const ButtonListItem = styled.li`
  padding: var(--gapSmall) var(--gapRegular);
  width: 100%;
  display: grid;
  justify-items: end;
`;

const sharedListItem = css`
  padding: var(--gapSmall) var(--gapRegular);
  width: 100%;
  color: var(--headingsColor);
  font-size: var(--baseL);
  text-align: inherit;
  line-height: var(--bodyLineHeight);
`;

const ListLink = styled(Navigator)`
  ${sharedListItem};
  font-weight: 600;
  font-size: var(--baseL);
`;

const ListButton = styled.button`
  ${sharedListItem}
  font-weight: 600;
  font-size: var(--baseL);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: color ${easeOutTiming};
  color: ${({ isAccordionOpen }) =>
    isAccordionOpen ? 'var(--primaryColor)' : 'var(--headingsColor)'};
`;

const AccordionListItem = styled.li`
  width: 100%;
  display: flex;
`;

const AccordionListLink = styled(Navigator)`
  ${sharedListItem};
  font-size: var(--baseM);
  font-weight: 600;
`;

const MobileNavDivider = styled.span`
  height: var(--borderSmall);
  background: var(--dividerColor);
  width: calc(100% - calc(var(--gapRegular) * 2));
  position: relative;

  ${({ isRtl }) => {
    if (isRtl) {
      return css`
        right: var(--gapRegular);
      `;
    }
    return css`
      left: var(--gapRegular);
    `;
  }}
`;

const ChevronContainer = styled.span`
  font-size: var(--headingS);
  display: flex;
  max-height: 0;
  color: ${({ isAccordionOpen }) => isAccordionOpen && 'var(--primaryColor)'};
  align-items: center;
  transition: transform ${easeOutTiming}, color ${easeOutTiming};
  transform: ${({ isAccordionOpen }) =>
    isAccordionOpen ? 'scaleX(-1) rotate(-90deg)' : 'rotate(90deg)'};
`;

const SeeAllCategories = styled(Navigator)`
  color: var(--primaryColor);
  font-size: var(--baseSMobile);
  padding: var(--gapRegular);
  display: flex;
`;

const AccordionList = styled.ul`
  visibility: ${({ isAccordionOpen }) => isAccordionOpen === null && 'hidden'};
  position: ${({ isAccordionOpen }) => isAccordionOpen === null && 'absolute'};
  transition: height ${easeOutTiming};
  overflow: hidden;
  height: ${({ isAccordionOpen, clientHeight }) => {
    if (isAccordionOpen) return `${clientHeight}px`;
    if (isAccordionOpen === false) {
      return 0;
    }
  }};
`;

// Main component

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

  const ariaControlsId = 'mobile_categories_list';

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
                    aria-controls={ariaControlsId}
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
                    id={ariaControlsId}
                    clientHeight={isAccordionOpen.clientHeight}
                    isAccordionOpen={isAccordionOpen.booleanValue}
                    ref={accordionListRef}
                  >
                    {categoryNodes.map(({ id, title }) => (
                      <AccordionListItem key={id}>
                        <AccordionListLink
                          recordId={id}
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
