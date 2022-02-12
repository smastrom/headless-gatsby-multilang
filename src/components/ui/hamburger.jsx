import React, { useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled, { css } from 'styled-components';
import { LangContext } from '../../context/langProvider';

// Scoped styles

const HamburgerButton = styled.button`
  padding: 0.33em;
  display: grid;
  align-content: center;
  width: 40px;
  height: 40px;
  --rowHeight: 4px;
  grid-template-rows: repeat(3, var(--rowHeight));
  row-gap: var(--rowHeight);

  & span {
    border-radius: var(--rowHeight);
    transition: all 0.2s ease-in-out;
    height: var(--rowHeight);
    width: 100%;

    &:first-child,
    &:nth-child(2),
    &:last-child {
      background: var(--baseTextColor);
    }
  }

  ${({ isOpen }) =>
    isOpen &&
    css`
      & span {
        &:first-child {
          transform: translateY(calc(var(--rowHeight) * 2)) rotateZ(45deg);
          opacity: 1;
        }
        &:nth-child(2) {
          opacity: 0;
        }
        &:last-child {
          transform: translateY(calc(var(--rowHeight) * -2)) rotateZ(-45deg);
          opacity: 1;
        }
      }
    `}
`;

// Main Component

const Hamburger = ({ isOpen, onClick }) => {
  const data = useStaticQuery(graphql`
    query {
      allDatoCmsMenu {
        nodes {
          ariaLabelHamburger
          locale
        }
      }
    }
  `);

  const {
    allDatoCmsMenu: { nodes },
  } = data;

  const { currentLanguage } = useContext(LangContext);

  return (
    <>
      {nodes
        .filter(({ locale }) => locale === currentLanguage)
        .map(({ locale, ariaLabelHamburger }) => (
          <HamburgerButton
            key={`hamb_${locale}`}
            aria-label={ariaLabelHamburger}
            isOpen={isOpen}
            onClick={onClick}
          >
            <span />
            <span />
            <span />
          </HamburgerButton>
        ))}
    </>
  );
};

export default Hamburger;
