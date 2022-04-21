import styled, { css } from 'styled-components';

import { easeOutTiming } from '../../sharedStyles/animationStyles';

const Button = styled.button`
  padding: 0.33em;
  display: grid;
  align-content: center;
  width: 40px;
  height: 40px;
  --rowHeight: 4px;
  grid-template-rows: repeat(3, var(--rowHeight));
  row-gap: var(--rowHeight);
`;

const HamburgerLine = styled.span`
  border-radius: var(--rowHeight);
  transition: all ${easeOutTiming};
  height: var(--rowHeight);
  width: 100%;
  background: var(--baseTextColor);

  ${({ isOpen }) =>
    isOpen &&
    css`
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
    `}
`;

export { Button, HamburgerLine };
