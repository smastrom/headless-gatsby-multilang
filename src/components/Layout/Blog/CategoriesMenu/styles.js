import styled, { css } from 'styled-components';

import { Navigator } from '../../../Navigator';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 var(--globalPaddingLr);
`;

const divider = 'var(--borderSmall) solid var(--dividerColor);';

const ScrollGradientContainer = styled.div`
  --scrollBarHeight: 6px;
  position: relative;
  width: var(--globalContainer);
  padding-bottom: var(--borderRegular);
  border-top: ${divider};
  border-bottom: ${divider};
  width: 100%;
  max-width: var(--globalContainer);

  &::after {
    position: absolute;
    content: '';
    width: var(--gapXL);
    z-index: 2;
    display: block;
    height: calc(100% - calc(var(--scrollBarHeight) * 2));
    top: 0;
    ${({ isRtl }) =>
      isRtl
        ? css`
            left: 0;
            background: linear-gradient(
              to left,
              var(--backgroundTransparentColor) 25%,
              var(--backgroundColor) 75%
            );
          `
        : css`
            right: 0;
            background: linear-gradient(
              to right,
              var(--backgroundTransparentColor) 25%,
              var(--backgroundColor) 75%
            );
          `}
  }
`;

const NavContainer = styled.nav`
  width: var(--globalContainer);
  padding: var(--gapRegular) 0
    calc(var(--gapRegular) - calc(var(--scrollBarHeight) / 2)) 0;
  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--dividerColor) var(--transparent);
  width: 100%;
  max-width: var(--globalContainer);

  &::-webkit-scrollbar {
    height: var(--scrollBarHeight);
  }

  &::-webkit-scrollbar-track {
    background: var(--backgroundColorAlt);
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--dividerColor);
    border-radius: var(--scrollBarHeight);
    border: none;
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

export {
  Wrapper,
  ScrollGradientContainer,
  NavContainer,
  NavList,
  CategoryLink,
};
